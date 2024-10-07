// src/controllers/cte.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { parseStringPromise } from 'xml2js';
import { NfeService } from 'src/services/nfe.service';
import { z } from "zod";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { ProdutoService } from 'src/services/produto.service';
import {DestinoService } from 'src/services/destino.service';
import {TransportadoraService } from 'src/services/transportadora.service';
import {FreteService } from 'src/services/frete.service';
import {BidService } from 'src/services/bid.service';
import axios from 'axios';


const dadosValidacaoBodySchema = z.object({
  operacao: z.string(),
  aeroportoDestino: z.string(),
  seguro: z.string(),
  tipoTransporte: z.string(),
  transportadora: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(dadosValidacaoBodySchema);

type DadosValidacaoBodySchema = z.infer<typeof dadosValidacaoBodySchema>;

@Controller('dadosvalidacao')
export class UploadCteController {
  constructor(
    private prisma: PrismaService,
    private nfeService: NfeService,
    private produtoService: ProdutoService,
    private destinoService: DestinoService,
    private transportadoraService: TransportadoraService,
    private freteService: FreteService,
    private bidService: BidService,

  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('cte'))
  async createCte(
    @UploadedFile() file: Express.Multer.File,
    @Body(bodyValidationPipe) body: DadosValidacaoBodySchema,
  ) {
    try {
      if (!file) {
        return { error: 'Arquivo XML não fornecido.' };
      }

      // Lê o arquivo XML como string
      const xml = file.buffer.toString();
      
      // Parse o XML para JSON
      const result = await parseStringPromise(xml);
      
      // Extração dos dados relevantes do JSON
      const CTe = result.cteProc.CTe[0].infCte[0]; // Ajuste conforme a estrutura do seu XML
      console.log(body)
      const protCTe = result.cteProc.protCTe[0]; // Ajuste conforme a estrutura do seu XML
      const arrayNumerocte = CTe.compl[0].xObs[0];
      const numeroPedido = arrayNumerocte.split('AEREO');

      // Captura NFE para mandar para a consulta na API
      const NFE = CTe.infCTeNorm[0].infDoc[0].infNFe[0].chave[0];

      // Faz a requisição para a API da Serpro
      const nfeData = await this.nfeService.getNfeDataFromApi(NFE);

      // Cria o registro CteArquivo, incluindo as novas informações recebidas
      const cteArquivo = await this.prisma.cteArquivo.create({
        data: {
          chaveAcesso: protCTe.infProt[0].chCTe[0],
          modalCte: CTe.compl[0].xCaracAd[0],
          numeroCte: CTe.ide[0].nCT[0],
          chaveNFE: NFE,
          numeroPedido: numeroPedido[1],
          nomeMotorista: CTe.compl[0].ObsCont[0].xTexto[0],
          cpfMotorista: CTe.compl[0].ObsCont[1].xTexto[0],
          placaMotorista: CTe.compl[0].ObsCont[2].xTexto[0],
          emissao: new Date(CTe.ide[0].dhEmi[0]),
          valorRecebido: parseFloat(CTe.vPrest[0].vRec[0]),
          valorFretePeso: parseFloat(CTe.vPrest[0].Comp[1].vComp[0]),
          valorfrete: parseFloat(CTe.vPrest[0].Comp[2].vComp[0]),
          valorTaxa: parseFloat(CTe.vPrest[0].Comp[3].vComp[0]),
          valorCarga: parseFloat(CTe.infCTeNorm[0].infCarga[0].vCarga[0]),
          valorPesoBruto: parseFloat(CTe.infCTeNorm[0].infCarga[0].infQ[0].qCarga[0]),
          valorVolumes: parseFloat(CTe.infCTeNorm[0].infCarga[0].infQ[1].qCarga[0]),
          valorPesoCubado: parseFloat(CTe.infCTeNorm[0].infCarga[0].infQ[2].qCarga[0]),

        },
      });

      // Salva os dados retornados da API na tabela Nfe
      const nfe = await this.prisma.nfe.create({
        data: {
          chave: NFE,
          partNumber: nfeData.partNumber,
          quantidade: nfeData.quantidade,
          valorUnitario: nfeData.valorUnitario,
          valortotal: nfeData.valortotal,
          descricao: nfeData.descricao,
          cteId: cteArquivo.id,
        },
      });

      const emitente = CTe.emit[0];
      const emitenteArquivo = await this.prisma.emitenteArquivo.create({
        data: {
          cnpj: emitente.CNPJ[0],
          inscricaoEstadual: emitente.IE[0],
          nome: emitente.xNome[0],
          nomeFantasia: emitente.xFant[0],
          logradouro: emitente.enderEmit[0].xLgr[0],
          numero: emitente.enderEmit[0].nro[0],
          complemento: emitente.enderEmit[0].xLgr[0],
          bairro: emitente.enderEmit[0].xBairro[0],
          municipio: emitente.enderEmit[0].xMun[0],
          codMunicipio: emitente.enderEmit[0].cMun[0],
          cep: emitente.enderEmit[0].CEP[0],
          estado: emitente.enderEmit[0].UF[0],
          telefone: emitente.enderEmit[0].fone[0],
          cteId: cteArquivo.id,
        },
      });

      const remetente = CTe.rem[0];
      const remetenteArquivo = await this.prisma.remetenteArquivo.create({
        data: {
          cnpj: remetente.CNPJ[0],
          inscricaoEstadual: remetente.IE[0],
          nome: remetente.xNome[0],
          nomeFantasia: remetente.xFant[0],
          logradouro: remetente.enderReme[0].xLgr[0],
          numero: remetente.enderReme[0].nro[0],
          complemento: remetente.enderReme[0].xLgr[0],
          bairro: remetente.enderReme[0].xBairro[0],
          municipio: remetente.enderReme[0].xMun[0],
          codMunicipio: remetente.enderReme[0].cMun[0],
          cep: remetente.enderReme[0].CEP[0],
          estado: remetente.enderReme[0].UF[0],
          cteId: cteArquivo.id,
        },
      });

      const destinatario = CTe.dest[0];
      const destinatarioArquivo = await this.prisma.destinatarioArquivo.create({
        data: {
          cnpj: destinatario.CNPJ[0],
          inscricaoEstadual: destinatario.IE[0],
          nome: destinatario.xNome[0],
          logradouro: destinatario.enderDest[0].xLgr[0],
          numero: destinatario.enderDest[0].nro[0],
          complemento: destinatario.enderDest[0].xLgr[0],
          bairro: destinatario.enderDest[0].xBairro[0],
          municipio: destinatario.enderDest[0].xMun[0],
          codMunicipio: destinatario.enderDest[0].cMun[0],
          cep: destinatario.enderDest[0].CEP[0],
          estado: destinatario.enderDest[0].UF[0],
          fone: destinatario.fone[0],
          cteId: cteArquivo.id,
        },
      });

      const imposto = CTe.imp[0].ICMS[0].ICMS00[0];
      const impostoArquivo = await this.prisma.impostoArquivo.create({
        data: {
          valorBaseCalculo: imposto.vBC[0],
          valorPercentualCalculo: imposto.pICMS[0],
          valorIcms: imposto.vICMS[0],
          cteId: cteArquivo.id,
        },
      });

      // dados relacionas  a comparacao 
      const produto = await this.produtoService.getProdutoByPartNumber(nfe.partNumber);
      const quantidade = nfe.quantidade;
      const quantidadeM = produto?.quantidadeMax ?? "0";
      const quant = parseInt(quantidadeM, 10); 
      const totalenvio = quantidade / quant;
      // const dimensaoCaixa = produto?.dimencaoCaixa;
      const dimensaoCaixa = "480X380X300";
      // const dimensaoPalete =1200x1000x130;
      const alturaMax = 1400;
      const fatorConversao = 167; // Constante de conversão
      // divergencia 1
      const divergencias: any[] = [];
      if (!cteArquivo.valorVolumes.equals(totalenvio)) {
        divergencias.push({
          nomenclatura: "Valor Volume",
          valorEsperado: totalenvio.toString(),
          valorDivergente: cteArquivo.valorVolumes
        });
      }
   // Função para converter a string de dimensões para um objeto com largura, profundidade e altura
      function converterDimensao(dimensaoString) {
        const [largura, profundidade, altura] = dimensaoString.split('X').map(Number);
        return { largura, profundidade, altura };
      }

      console.log(dimensaoCaixa)
      // Converter as dimensões para objetos
      const caixa = converterDimensao(dimensaoCaixa);
      // Cálculo da altura útil (altura máxima - altura do palete)
      const alturaUtil = alturaMax - 130;

      // Quantas caixas cabem na altura
      const caixasEmAltura = Math.floor(alturaUtil / caixa.altura);

      // Quantas caixas cabem na base do palete
      const caixasEmLargura = Math.floor(1200 / caixa.largura);
      const caixasEmProfundidade = Math.floor(1000 / caixa.profundidade);

      // Número total de caixas por palete (quantidade por camada * número de camadas)
      const totalCaixasPorPalete = caixasEmLargura * caixasEmProfundidade * caixasEmAltura;

      // Calcular o número de paletes necessários
      const numPaletesCompletos = Math.floor(totalenvio / totalCaixasPorPalete); // Paletes completos
      const caixasRestantes = totalenvio % totalCaixasPorPalete; // Caixas restantes para o palete quebrado

      // Calcular o volume de uma caixa
      const volumeCaixa = caixa.largura * caixa.profundidade * caixa.altura;
      var volumePaletesCompletos;
      console.log(numPaletesCompletos)
      // Volume cubado dos paletes completo
      if(numPaletesCompletos == 1){
         volumePaletesCompletos = (numPaletesCompletos * (1200*1000*1400)) * fatorConversao;
      }else{
         volumePaletesCompletos = ((numPaletesCompletos) * (1200*1000*1400)) * fatorConversao;
      }

      // Calcular o volume cubado do "palete quebrado" (se houver caixas restantes)
      let volumePaleteQuebrado = 0;
      if (caixasRestantes > 0) {
        volumePaleteQuebrado = ((130 + caixa.altura) * (1200*1000)) * fatorConversao;
      }

      // Somar os volumes cubados dos paletes completos e do palete quebrado
      const volumeCubadoTotal = volumePaletesCompletos + volumePaleteQuebrado;
      const volumeCubadoTotalFormatado = ((volumeCubadoTotal/1000) / 1000000).toFixed(2);

      const volumeCubadoTotalInteiro: number = parseFloat(volumeCubadoTotalFormatado);
      // divergencia 2

      if (!cteArquivo.valorPesoCubado.equals(volumeCubadoTotalInteiro)) {
        divergencias.push({
          nomenclatura: "Valor Peso Cubado",
          valorEsperado: volumeCubadoTotalInteiro.toString(),
          valorDivergente: cteArquivo.valorPesoCubado
        });
      }
      

      const standard = (produto?.standard ?? "0").trim();
      const standardWithPoint = standard.replace(',', '.');
      const pesostandard = parseFloat(standardWithPoint);

      const pesoBruto = totalenvio * pesostandard;
      // divergencia 3

      if (!cteArquivo.valorPesoBruto.equals(pesoBruto)) {
        divergencias.push({
          nomenclatura: "Valor Peso Bruto",
          valorEsperado: pesoBruto.toString(),
          valorDivergente: cteArquivo.valorPesoBruto
        });
      }


      
      const destino = await this.destinoService.getDestinoByPartNumber(body.aeroportoDestino);
      const transportadora = await this.transportadoraService.getTransportadoraByPartNumber(body.transportadora);
      const frete = await this.freteService.getfreteByPartNumber(body.operacao);
      var fretePeso ;
      if(volumeCubadoTotalInteiro < pesoBruto){
        const valorKg = frete?.valorKg ?? "0";
        fretePeso = pesoBruto * parseFloat(valorKg);
      }else{
        const valorKg = frete?.valorKg ?? "0";
        fretePeso = volumeCubadoTotalInteiro * parseFloat(valorKg);
      }
      // divergencia 4

      if (fretePeso !== cteArquivo.valorFretePeso) {
        divergencias.push({
          nomenclatura: "Valor Frete Peso",
          valorEsperado: fretePeso.toString(),
          valorDivergente: cteArquivo.valorFretePeso
        });
      }

      const ICMS = (fretePeso+10)*0.12;
      // divergencia 5

      if (Number(impostoArquivo.valorIcms) !== ICMS) {
        divergencias.push({
          nomenclatura: "Valor ICMS",
          valorEsperado: ICMS.toString(),
          valorDivergente: impostoArquivo.valorIcms
        });
      }



      const valorTtotalCte = fretePeso+ 10 + ICMS;
      // divergencia 6

      if (Number(cteArquivo.valorRecebido) !== valorTtotalCte) {
        divergencias.push({
          nomenclatura: "Valor total CTE",
          valorEsperado: valorTtotalCte.toString(),
          valorDivergente: cteArquivo.valorRecebido
        });
      }
      

    
      const bidId = frete?.bidId;


      await axios.post('http://localhost:3333/validacao', {
        produtoId:produto?.id,
        bidId: bidId,
        cteId: cteArquivo.id,
        divergencias,
      });

      if (bidId) {
        const bid = await this.bidService.getBidByPartNumber(bidId);
        // Envia as divergências para o CriarValidacaoController
        // Continue o processo
      } else {
        // Lidar com o caso onde bidId é undefined
        console.error('bidId is undefined');
      }


     
      const status = divergencias && divergencias.length > 0 ? "Inválido" : "Válido";
      const  message = divergencias && divergencias.length > 0 ? "Divergências encontradas, por favor veficar a validação!" : "CT-e e dados relacionados inseridos com sucesso.";



      // Retorna os dados inseridos com uma mensagem de sucesso
      return {
        status:status,
        message: 'CT-e e dados relacionados inseridos com sucesso.',
        data: {
          cteArquivo,
          emitenteArquivo,
          remetenteArquivo,
          destinatarioArquivo,
          impostoArquivo,
          nfe
        },
      };
    } catch (error) {
      console.error('Erro ao processar XML:', error);
      throw new Error('Erro ao processar XML');
    }
  }
}

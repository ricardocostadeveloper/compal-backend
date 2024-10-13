import { Module,MiddlewareConsumer, NestModule  } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { CriarUsuarioController } from './controllers/user/criar-usuario.controller';
import { envSchema } from './env';
import { AuthModule } from './auth/auth.module';
import { AuthenticateController } from './controllers/user/authenticate.controller';
import { CriarTransportadoraController } from './controllers/transportadora/criar-transportadora.controller';
import { CriarOrigemController } from './controllers/origem/criar-origem.controller';
import { CriarDestinoController } from './controllers/destino/criar-destino.controller';
import { CriarBidController } from './controllers/bid/criar-bid.controller';
import { CriarSeguroTransportadoraController } from './controllers/criar-segura-transportadora.controller';
import { CriarValorGeralDdrController } from './controllers/criar-valor-geral-ddr.controller';
import { CriarOutrosController } from './controllers/criar-outros.controller';
import { TableBidController } from './controllers/bid/table-bid.controller';
import { UploadCteController } from './controllers/cte/upload-cte-arquivo.controller';
import { TableTransportadoraController } from './controllers/transportadora/table-transportadora.controller';
import { NfeService } from './services/nfe.service'; // Importa o serviço
import { CriarProdutosController } from './controllers/produto/criar-produto.controller';
import { CriarValidacaoController } from './controllers/validacao/criar-validacao.controller';
import { TableValidacaoController } from './controllers/validacao/table-validacao.controller';
import { CorsMiddleware } from './cors.middleware';
import { DetalhesValidacaoController } from './controllers/validacao/detalhe-validacao.controller';
import { DetalhesDivergenciaController } from './controllers/validacao/detalhe-divergencia.controller';
import { SeguroSelectController } from './controllers/bid/select-seguros-bid.controller';
import { TransportadoraSelectController } from './controllers/transportadora/select-transportadora-bid.controller';
import { DestinoSelectController } from './controllers/bid/select-destino-bid.controller';
import { DadosValidacaoController } from './controllers/validacao/dados-validacao.controller';
import { CriarFreteController } from './controllers/criar-frete.controller';
import { ProdutoService } from './services/produto.service';
import { DestinoService } from './services/destino.service';
import { TransportadoraService } from './services/transportadora.service';
import { FreteService } from './services/frete.service';
import { BidService } from './services/bid.service';
import { TableOrigemController } from './controllers/origem/table-origem.controller';
import { DeletarOrigemController } from './controllers/origem/deletar-origem.controller';
import { TableDestinoController } from './controllers/destino/table-destino.controller';
import { TableProdutosController } from './controllers/produto/table-transportadora.controller';
import { OrigemSelectController } from './controllers/bid/select-origem-bid.controller';
import { CriarValorBidController } from './controllers/bid/criar-valor-bid.controller';
import { SegurosBidController } from './controllers/bid/detalhe-bid-seguro.controller';
import { DetalhesBidController } from './controllers/bid/detalhe-bid-geral.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule
  ],
  controllers: [
    CriarUsuarioController,
    AuthenticateController,
    CriarTransportadoraController,
    CriarOrigemController,
    CriarDestinoController,
    CriarBidController,
    CriarSeguroTransportadoraController,
    CriarValorGeralDdrController,
    CriarOutrosController,
    CriarFreteController,
    CriarProdutosController,
    CriarValidacaoController,
    DetalhesValidacaoController,
    TableBidController,
    TableValidacaoController,
    TableOrigemController,
    TableTransportadoraController,
    TableDestinoController,
    UploadCteController,
    DetalhesDivergenciaController,
    SeguroSelectController,
    TransportadoraSelectController,
    DestinoSelectController,
    DeletarOrigemController,
    TableProdutosController,
    OrigemSelectController,
    CriarValorBidController,
    SegurosBidController,
    DetalhesBidController
  ],
  providers: [
    NfeService,
    PrismaService,
    ProdutoService,
    DestinoService,
    TransportadoraService,
    FreteService,
    BidService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}

import { Controller, Post, Body, UploadedFile, UseInterceptors } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller("/teste")
export class DadosValidacaoController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // ou qualquer outro diretório de sua escolha
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
      }
    }),
  }))
  async handle(
    @Body() dadosValidacao: any, // Use 'any' para receber dados JSON sem tipagem específica
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log('Dados JSON recebidos:', dadosValidacao);

    if (file) {
      // Se você está enviando um arquivo, exibe informações sobre o arquivo
      console.log('Arquivo recebido:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        buffer: file.buffer.toString(), // ou file.buffer se preferir o buffer bruto
      });
    } else {
      console.log('Nenhum arquivo recebido.');
    }

    return { message: "Dados recebidos com sucesso." };
  }
}

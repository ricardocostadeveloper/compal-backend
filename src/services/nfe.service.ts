import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class NfeService {
  private tokenUrl = "https://gateway.apiserpro.serpro.gov.br/token";
  private apiUrl = "https://gateway.apiserpro.serpro.gov.br/consulta-nfe-df/api/v1/nfe";
  private consumerKey = "rBxBkMdYfHyb_6725F8HH2x_7BAa";
  private consumerSecret = "bK7uRE9Elg8LG9gn_3cjMJeHEVka";
  
  // Método para obter os dados da NFe a partir da API
  async getNfeDataFromApi(chaveNfe: string) {
    const credentials = `${this.consumerKey}:${this.consumerSecret}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64'); // Substitua btoa pelo Buffer do Node.js
    const token = await this.getAccessToken(this.tokenUrl, encodedCredentials);

    const response = await fetch(`${this.apiUrl}/${chaveNfe}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro na consulta: ${response.status}, Detalhes: ${errorText}`);
    }

    const responseData = await response.json();
    const dadosNf = responseData.nfeProc.NFe.infNFe.det[0].prod
    return {
      partNumber: dadosNf.cProd,
      quantidade: dadosNf.qCom,
      valorUnitario: dadosNf.vUnTrib,
      valortotal: dadosNf.vProd,
      descricao: dadosNf.xProd,
    };
  }

  // Método para obter o token de acesso
  async getAccessToken(tokenUrl: string, encodedCredentials: string) {
    const headers = {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const data = new URLSearchParams({ grant_type: "client_credentials" });

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: headers,
      body: data,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro na obtenção do token: ${response.status}, Detalhes: ${errorText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.access_token;
  }
}

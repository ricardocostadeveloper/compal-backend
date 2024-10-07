// src/interfaces/cte.interface.ts
export interface Cte {
  infCte: {
      ide: {
        cUF: string;
        cCT: string;
        CFOP: string;
        natOp: string;
        mod: string;
        serie: string;
        nCT: string;
        dhEmi: string;
        tpImp: string;
        tpEmis: string;
        cDV: string;
        tpAmb: string;
        tpCTe: string;
        procEmi: string;
        verProc: string;
        cMunEnv: string;
        xMunEnv: string;
        UFEnv: string;
        modal: string;
        tpServ: string;
        cMunIni: string;
        xMunIni: string;
        UFIni: string;
        cMunFim: string;
        xMunFim: string;
        UFFim: string;
        retira: string;
        indIEToma: string;
      };
      compl: {
          xCaracAd: string;
          ObsCont: {
            xTexto: string;
          };
      };
      emit: {
          CNPJ: string;
          IE: string;
          xNome: string;
          xFant: string;
          enderEmit: {
            xLgr: string;
            nro: string;
            xBairro: string;
            xCpl: string;
            cMun: string;
            xMun: string;
            CEP: string;
            UF: string;
            fone: string;
          };

      };
      rem: {
          CNPJ: string;
          IE: string;
          xNome: string;
          xFant: string;
          enderReme: {
            xLgr: string;
            nro: string;
            xBairro: string;
            xCpl: string;
            cMun: string;
            xMun: string;
            CEP: string;
            UF: string;
            fone: string;
          };
      };
      dest: {
          CNPJ: string;
          IE: string;
          xNome: string;
          xFant: string;
          enderDest: {
            xLgr: string;
            nro: string;
            xBairro: string;
            xCpl: string;
            cMun: string;
            xMun: string;
            CEP: string;
            UF: string;
            fone: string;
          };
      };
      vPrest: {
          vTPrest: string;
          Comp: {
            vComp: string;
          };
      };
      imp: {
        ICMS:{
          ICMS00:{
            vBC: string;
            pICMS: string;
            vICMS: string;
          }
        };
        vTotTrib: string;
      };
  };
}

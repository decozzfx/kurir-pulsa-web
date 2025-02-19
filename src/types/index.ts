export interface OperatorTypes {
  id: string;
  created_at: string;
  operator_name: string;
  rate: number;
  notes: null;
  isEnable: boolean;
  rules: null;
  notes_trf_pulsa: null;
  notes_cvrt_pulsa: null;
  sisa_pulsa: null | string;
  img_url: string;
  min_order: number;
}

export interface BankType {
  id: string;
  created_at: string;
  nama_bank: string;
  img_url: string;
  biaya: null | string;
}

export interface IPayloadConvertPulsaTypes {
  provider: { id: string; value: string };
  pulsaQty: string;
  nomorPengirim: string;
  paymentMethod: { id: string; value: string };
  nomorRekening: string;
  pemilikRekening: string;
  infoSisaPulsa?: string;
}

export interface IGetPrimaryDataResonse {
  created_at: string;
  id: number;
  jam_buka: string;
  jam_tutup: string;
  nomor_hp: string[];
  snk: string;
}

import { api } from '@libs/axios/axios';

export interface CredentialData {
  api_key_instagram: string;
  whatsapp_verify_token: string;
  whatsapp_token: string;
  whatsapp_phone_number_id: string;
}

export interface FormFieldData {
  name: string;
  value: string;
}

export interface FormData {
  name: string;
  form_fields: FormFieldData[];
}

export interface NotesData {
  contents: string;
}

export interface AICreateRequest {
  name: string;
  business_id: number;
  crud: CredentialData;
  form: Record<string, FormData>;
  notes: NotesData;
}

export interface AICreateResponse {
  status: string;
  ai_id: number;
  credential_id: number;
  form_ids: number[];
  note_id: number;
}

export interface AIReadByIdResponse {
  id: number;
  name: string;
  form_id: number;
  credential_id: number;
  business_id?: number;
}

export interface AIUpdateRequest {
  name?: string;
  crud?: CredentialData;
  notes?: NotesData;
}

export interface AIDeleteResponse {
  status: string;
  message: string;
}

export interface AIListResponse {
  total: number;
  ai_list: AIReadByIdResponse[];
}

export const aiApi = {
  create: (payload: AICreateRequest) =>
    api.post<AICreateResponse>('/api/v1/ai/create', payload),

  readById: (aiId: number) =>
    api.get<AIReadByIdResponse>(`/api/v1/ai/read_by_id/${aiId}`),

  readAllForBusiness: (businessId: number) =>
    api.get<AIListResponse>(`/api/v1/ai/read_all_for_business/${businessId}`),

  update: (aiId: number, payload: AIUpdateRequest) =>
    api.put<{ status: string; ai_id: number; message: string }>(
      `/api/v1/ai/update/${aiId}`,
      payload
    ),

  delete: (aiId: number) =>
    api.delete<AIDeleteResponse>(`/api/v1/ai/delete/${aiId}`),
};

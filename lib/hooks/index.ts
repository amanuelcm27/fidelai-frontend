import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/services/api-client';
import { API_ENDPOINTS } from '@/services/endpoints';

/* ─────────────────────────────────────
   Auth Hooks
   ───────────────────────────────────── */

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.AUTH.ME);
      return data;
    },
    retry: false,
  });
}

/* ─────────────────────────────────────
   Dataset Hooks
   ───────────────────────────────────── */

export function useDatasets(params?: Record<string, string>) {
  return useQuery({
    queryKey: ['datasets', params],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.DATASETS.LIST, { params });
      return data;
    },
  });
}

export function useDataset(id: string) {
  return useQuery({
    queryKey: ['dataset', id],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.DATASETS.DETAIL(id));
      return data;
    },
    enabled: !!id,
  });
}

export function useUploadDataset() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await apiClient.post(API_ENDPOINTS.DATASETS.UPLOAD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['datasets'] });
    },
  });
}

/* ─────────────────────────────────────
   Task Hooks
   ───────────────────────────────────── */

export function useTasks(params?: Record<string, string>) {
  return useQuery({
    queryKey: ['tasks', params],
    queryFn: async () => {
      const { data } = await apiClient.get(API_ENDPOINTS.TASKS.QUEUE, { params });
      return data;
    },
  });
}

export function useSubmitTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: unknown }) => {
      const { data } = await apiClient.post(API_ENDPOINTS.TASKS.SUBMIT(id), payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

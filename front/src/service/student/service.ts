import { http } from "@/plugins/http";
import type { IStudent, IStudentFilters } from "@/service/student/interface";

export async function list(params: IStudentFilters) {
  const { data } = await http.get<IStudent[]>("/students", {
    params,
  });

  return data;
}

export async function create(formData: Omit<IStudent, "id">) {
  const { data } = await http.post<IStudent>("/students", formData);

  return data;
}

export async function remove(id: number) {
  await http.delete(`/students/${id}`);
}

export async function get(id: number) {
  const { data } = await http.get<IStudent>(`/students/${id}`);

  return data;
}

export async function update(id: number, formData: Omit<IStudent, "id">) {
  const { data } = await http.put<IStudent>(`/students/${id}`, formData);

  return data;
}

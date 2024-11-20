<template>
  <v-container>
    <loading :loading />
    <confirm-dialog ref="confirmDialog" />
    <h2>Consulta de Alunos</h2>
    <div class="mt-10">
      <v-row>
        <v-col>
          <v-text-field
            label="Pesquisar pelo nome"
            variant="outlined"
            density="compact"
            @update:model-value="handleSearch($event)"
          />
        </v-col>
        <v-col class="text-end">
          <v-btn
            color="orange"
            class="mt-2"
            @click="router.push('/dashboard/students/create')"
          >
            Cadastrar
            <span class="d-none d-sm-block ml-1">Aluno</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :items="students"
        :headers
        no-data-text="Nenhum aluno encontrado"
        items-per-page-text="Itens por página"
      >
        <template v-slot:item.actions="{ item }">
          <div class="d-flex ga-2">
            <v-btn
              v-tooltip:top="'Editar aluno'"
              color="green"
              icon="mdi-pencil"
              size="small"
              variant="text"
              @click="router.push(`/dashboard/students/${item.id}`)"
            />
            <v-btn
              v-tooltip:top="'Excluir aluno'"
              color="red"
              icon="mdi-delete"
              size="small"
              variant="text"
              @click="handleOpenDialogDelete(item.id)"
            />
          </div>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script lang="ts">
import { getError } from "@/utils/error";
import Loading from "@/components/Loading.vue";
import { setMaskCpf } from "@/utils/helpers";
import { debounce } from "lodash"
import type { IStudent } from "@/service/student/interface";
import { list, remove } from "@/service/student/service";
import useToast from "@/composables/useToast";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import { ref } from "vue";

export default {
  name: "Students",
  components: { Loading },
  setup() {
    return {
      router: useRouter(),
      toast: useToast(),
      confirmDialog: ref<InstanceType<typeof ConfirmDialog>>(),
      headers: [
        {
          title: "Registro Acadêmico",
          sortable: true,
          key: "ra",
        },
        {
          title: "Nome",
          sortable: true,
          key: "name",
        },
        {
          title: "CPF",
          sortable: true,
          key: "cpf",
          value: (item: IStudent) => setMaskCpf(item.cpf),
        },
        {
          title: "Ações",
          key: "actions",
        },
      ]
    }
  },
  data() {
    return {
      search: "",
      students: [] as IStudent[],
      loading: false,
      filters: {
        name: "",
        order: "asc",
        sort: "name",
      },
    }
  },
  created() {
    this.fetchStudents();
    this.handleSearch = debounce(this.handleSearch, 500) as (text: string) => Promise<void>;
  },
  methods: {
    setMaskCpf,
    async handleSearch(text: string)  {
      this.filters.name = text;
      await this.fetchStudents();
    },
    async fetchStudents() {
      this.loading = true;

      try {
        this.students = await list(this.filters);
      } catch (error) {
        const treatedError = getError(error, "Não foi possível listar os alunos");
        this.toast.error(treatedError.title, treatedError.message);
      } finally {
        this.loading = false;
      }
    },
    async handleOpenDialogDelete(id: number) {
      const value = await this.confirmDialog?.open(
        "Excluir Aluno",
        "Deseja realmente excluir este aluno?",
        { color: "red" }
      )

      if (!value) {
        return
      }

      this.loading = true;
      try {
        await remove(id);

        this.toast.success("Sucesso", "Aluno excluído com sucesso");

        await this.fetchStudents();
      } catch (error) {
        const treatedError = getError(error, "Não foi possível excluir o aluno");

        this.toast.error(treatedError.title, treatedError.message);
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>

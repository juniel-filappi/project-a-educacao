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
      >
        <template v-slot:item.actions="{ item }">
          <div class="d-flex ga-2">
            <v-btn
              v-tooltip:top="'Editar aluno'"
              color="blue"
              icon="mdi-pencil"
              size="small"
              @click="router.push(`/dashboard/students/${item.id}`)"
            />
            <v-btn
              v-tooltip:top="'Excluir aluno'"
              color="red"
              icon="mdi-delete"
              size="small"
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
import { EventBus } from "@/plugins/event-bus";

export default {
  name: "Students",
  components: { Loading },
  setup() {
    return {
      router: useRouter(),
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
          value: item => setMaskCpf(item.cpf),
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
    async handleSearch(text: string): Promise<void>  {
      this.filters.name = text;
      await this.fetchStudents();
    },
    async fetchStudents() {
      this.loading = true;

      try {
        this.students = await list(this.filters);
      } catch (error) {
        const treatedError = getError(error, "Não foi possível listar os alunos");
        EventBus.$emit("toast", {
          title: treatedError.title,
          text: treatedError.message,
          color: "error",
        });
      } finally {
        this.loading = false;
      }
    },
    async handleOpenDialogDelete(id: number) {
      const value = await this.$refs.confirmDialog.open(
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

        EventBus.$emit("toast", {
          title: "Sucesso!",
          text: "Aluno excluído com sucesso",
          color: "success",
        });

        await this.fetchStudents();
      } catch (error) {
        const treatedError = getError(error, "Não foi possível excluir o aluno");
        EventBus.$emit("toast", {
          title: treatedError.title,
          text: treatedError.message,
          color: "error",
        });
      } finally {
        this.loading = false;
      }
    },
  }
};
</script>

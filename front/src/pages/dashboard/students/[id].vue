<template>
  <v-container>
    <loading :loading />
    <h2>Atualizar Aluno</h2>
    <div class="mt-10">
      <student-form
        v-model:name="form.name"
        v-model:email="form.email"
        v-model:ra="form.ra"
        v-model:cpf="form.cpf"
        :vuelidate="v$"
        have-id
      />
      <div class="d-flex justify-space-between">
        <v-btn
          color="white"
          class="mt-2"
          @click="router.push('/dashboard')"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="orange"
          class="mt-2"
          :loading
          @click="handleSave"
        >
          Salvar
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import StudentForm from "@/components/StudentForm.vue";
import { useVuelidate } from "@vuelidate/core";
import { update, get } from "@/service/student/service";
import { getError } from "@/utils/error";
import Loading from "@/components/Loading.vue";
import useToast from "@/composables/useToast";
import { email, helpers, minLength, required } from "@vuelidate/validators";

export default {
  name: "CreateStudent",
  components: { Loading, StudentForm },
  setup() {
    return {
      router: useRouter(),
      route: useRoute(),
      v$: useVuelidate(),
      toast: useToast(),
    }
  },
  data() {
    return {
      loading: false,
      form: {
        name: "",
        email: "",
        ra: "",
        cpf: "",
      },
    };
  },
  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage("Campo obrigatório", required),
        },
        email: {
          required: helpers.withMessage("Campo obrigatório", required),
          email: helpers.withMessage("E-mail inválido", email),
        },
        ra: {
          required: helpers.withMessage("Campo obrigatório", required),
        },
        cpf: {
          required: helpers.withMessage("Campo obrigatório", required),
          minLength: helpers.withMessage("CPF inválido", minLength(11)),
        },
      },
    };
  },
  created() {
    this.loadStudent();
  },
  methods: {
    async loadStudent() {
      try {
        const { id } = this.route.params as { id: number };
        const data = await get(id);

        this.form = {
          name: data.name,
          email: data.email,
          ra: data.ra,
          cpf: data.cpf,
        }
      } catch (error) {
        const treatedError = getError(error, "Não foi possível buscar o aluno");
        this.toast.error(treatedError.title, treatedError.message)
      }
    },
    async handleSave() {
      this.v$.$touch();

      if (this.v$.$error) {
        this.toast.error("Por favor", "Preencha os campos corretamente");
        return;
      }

      this.loading = true;
      try {
        const { id } = this.route.params as { id: number };
        await update(id, this.form);

        this.toast.success("Sucesso", "Aluno atualizado com sucesso");
        await this.router.push('/dashboard');
      } catch (error) {
        const treatedError = getError(error, "Não foi possível atualizar o aluno");
        this.toast.error(treatedError.title, treatedError.message)
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

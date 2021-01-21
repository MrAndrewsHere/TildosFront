<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-row justify="end">
          <v-col cols="12"
                 sm="4"
                 md="3">
            <v-switch
                v-model="opened"
                label="Открытые"
                color="green"


                hide-details
            ></v-switch>
          </v-col>
          <v-spacer></v-spacer>



          <v-col
              cols="12"
              sm="4"
              md="3"
          >
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Найти"
                color="black"
                single-line
                hide-details
            ></v-text-field>
          </v-col>
        </v-row>


      </v-card-title>
      <v-data-table class="px-3"
                    :headers="headers"
                    :items="DCRs"
                    :loading="loading"
                    loading-text="Loading... Please wait"
                    :search="search"
                    show-expand
                    item-key="id"


      >
        <template v-slot:expanded-item="{ item }">
          <td colspan="6">
            <v-simple-table light class="pa-2" style="background: transparent;box-shadow: none">
              <template v-slot:default>
                <thead>
                <tr>


                  <th class="text-left">
                    Запрос от
                  </th>
                  <th class="text-left">
                    Дата обновления
                  </th>
                  <th class="text-left">
                    Закрыл
                  </th>
                  <th class="text-left">
                    Комментарий
                  </th>


                  <th class="text-left">
                    Существующий домен
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr

                >




                  <td>{{ item.request_user? item.request_user.login : '' }}</td>
                  <td>{{ formatDate(item.updated_at)  }}</td>

                  <td>{{ item.response_user ? item.response_user.login : '' }}</td>
                  <td>{{ item.comment }}</td>
                  <td>{{ item.old_domain }}</td>

                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </td>


        </template>


        <template v-slot:item.created_at="{ item }">
          {{ formatDate(item.created_at) }}

        </template>


      </v-data-table>
    </v-card>

  </v-container>

</template>

<script>
import {isSomeRole} from "@/components/controlpanel/PageBuilder/mixins/ComponentComputed";
import {HTTP} from "@/axios";

export default {
  name: "domains",
  mixins: [isSomeRole],
  props: ['query'],
  data: () => {
    return {
      snackbar:true,
      DCRs: [],
      headers: [
        {
          text: 'Домен',
          align: 'start',
          value: 'domain',
        },

        {text: 'Дата создания', value: 'created_at'},

        {text: 'Статус', value: 'success'},
        {text: 'Открыт', value: 'closed'},


      ],
      loading: false,
      opened: true,
      search: '',
    }
  },
  methods: {
    formatDate(date) {
      let newDate = new Date(date);
      return newDate.toTimeString().substr(0, 5) + ' ' + newDate.toISOString().substr(0, 10)
    },

    DCRclose(dcrData){

      return new Promise((resolve, reject) => {
        HTTP.post('/DCRclose', JSON.stringify(dcrData),{
          headers: {
            "Content-Type": "application/json"
          }}).then(res => {resolve(res)}).catch(err => { this.$router.push('/500')});
      });
    },
    getDCRs(){
      this.loading = true
      HTTP.get('/DCRall').then(res => {
        this.DCRs = res.data;
      }).catch().finally(() => {
        this.loading = false

      })
    }
  },

  mounted() {
    if (!this.isSuperAdmin && !this.isDomainAdmin) {
      this.$router.push('/403');
    }

    if(this.query.auto && this.query.dcrid)
    {
      this.DCRclose({
        dcrID: this.query.dcrid
      }).then(res=>{
        this.$router.push('/'+res.data.code)
      })
    }
    else {
      this.getDCRs()
      this.query.domainName ? this.search = this.query.domainName : null;

    }

  }
}
</script>

<style scoped>

</style>
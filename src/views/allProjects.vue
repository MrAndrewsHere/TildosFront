<template>
  <div style="">
    <div class="td-maincontainer">

      <div class="td-sites-maincontainer">

        <div class="td-sites-uppanel">
          <div class="td-sites-uppanel__wrapper">
            <div class="td-sites-uppanel__title">Все сайты:</div>
            <div class="td-sites-uppanel__rightside">

              <div class="td-sites-uppanel__righttable">


                <div class="td-sites-uppanel__righttabletd">
                  <table class="td-sites-uppanel__rightbtn-table"
                  >
                    <tbody>

                    </tbody>
                  </table>
                </div>




              </div>
            </div>
          </div>
        </div>

        <div class="td-sites-grid">


          <div class="td-sites-grid__cell" v-for="(project,index) in projects" :key="index" :id="'project'+project.id">

            <div class="td-sites-grid__item" style="cursor: pointer">

              <div class="td-site__section-one" @click="$router.push('/project/'+project.id)"
                   alt="Перейти к редактированию">
                <div class="td-site__title ">{{project.name}}</div>
                <div class="td-site__descr overline">{{getOwner(index)}}</div>
              </div>

              <div class="td-site__hr"></div>

              <div class="td-site__section-two">
                <div class="td-site__section-two-wrapper">
                  <table class="td-site__settings">
                    <tbody>
                    <tr>
                      <td><img src="../assets/icons/td-icon-edit.png" width="14px" height="14px"
                               style="padding:5px;"></td>
                      <td class="td-site__settings-title">
                        <div style="cursor: pointer" @click="$router.push('/project/'+project.id)">Редактировать
                          сайт</div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <table class="td-site__url">
                    <tbody>
                    <tr>
                      <td><img src="../assets/icons/td-site__link.png" width="14px" height="14px"
                               style="margin-top:6px;"></td>
                      <td class="td-site__url-link"><a style="color: black;text-decoration: none" :href="project.domain?'http://'+project.domain:'#'" :target="project.domain?'_blank':''"
                                                       rel="noopener noreferrer">{{project.domain || project.techdomain+'.uni-dubna.ru'}}</a>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>




        </div>

      </div>


      <br><br><br><br>


    </div>



  </div>
</template>

<script>
import {HTTP} from "../axios/index";

export default {
  name: "allProjects",
  data: () => {
    return {
      projects: [],
      overlay: false,
      name: '',
      error: '',
    }
  },

  methods:{
    getOwner(index){
      let user = this.projects[index].users.filter( el => {return el.role.name ==='ownerP'})[0]
      return user.name + ' ('+user.login+')';
    }
  },


  mounted() {
    document.getElementById('authleaner').hidden = false;
    HTTP.get('/allProjects').then(res => {
      this.projects = res.data
    }).finally(()=>{ document.getElementById('authleaner').hidden = true;})
  }
}
</script>

<style scoped>

</style>
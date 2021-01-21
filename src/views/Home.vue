<template>
   <div class="main-page">

       <header class="main-page__header">
            <div class="main-logo">
                <span class="main-logo__text">Государственный <br> университет «Дубна»</span>
                <img class="main-logo__img" src="../assets/logo.svg" alt="Логотип университет">
            </div>
       </header>
       <main class="main-page__content">
           <section class="image-section">
               <img class="image-section__img" src="../assets/people_homepage.svg" alt="Картинка с большим телефоном и людьми">
           </section>
           <section class="form-section">

                <form method="" action="#" class="authorization-form" onsubmit="return false">
                    <div class="field_error"> <span>{{ error }}</span></div>
                    <text-field :type="'text'" :name="'login'" place-holder="ЛОГИН" icon="login" :error-message="loginError" v-model="login"/>
                    <text-field :type="'password'" :name="'password'"  place-holder="ПАРОЛЬ" icon="login" :error-message="passwordError" v-model="password"/>
                    <custom-button color="orange" @click="auth">{{isLoggedIn?'Создать сайт':'Войти'}}</custom-button>

                </form>
           </section>
       </main>
       <footer class="main-page__footer">
            <div class="social">
                <a href="#" class="social__link">
                    <img src="@/assets/icons/icon_vk.svg" alt="иконка вк">
                </a>
                <a href="#" class="social__link">
                    <img src="@/assets/icons/icon_instagram.svg" alt="иконка инстаграма">
                </a>
                <a href="#" class="social__link">
                    <img src="@/assets/icons/icon_twitter.svg" alt="иконка твиттера">
                </a>
                <a href="#" class="social__link">
                    <img src="@/assets/icons/icon_facebook.svg" alt="иконка фейсбука">
                </a>
            </div>
           <a class="main-site-link" href="https://uni-dubna.ru">www.uni-dubna.ru</a>
       </footer>
   </div>
</template>


<script>
    export default {
        name: "Home",
        data(){
            return {
                login : "",
                loginError: "",
                password: "",
                passwordError: "",
                error: "",
            }
        },
        computed:{
            isLoggedIn(){
                return this.$store.getters.isLoggedIn;
            }
        },
        methods: {
            auth: function () {
                if(this.isLoggedIn)
                {
                    this.$router.push('/projects')
                }
                else
                {

                    let login = this.login
                    let password = this.password
                    this.$store.dispatch('login', {login,password})
                        .then(() => this.$router.push('/projects'))
                        .catch(err =>{

                            console.log(err);
                            if(err.toString().includes('Network Error'))
                            {
                                this.error = 'Network error'
                                return
                            }
                            if(err.response.data.message)
                            {
                                this.error = err.response.data.message;
                            }
                            else
                            {
                                this.loginError = err.response.data.login[0];
                                this.passwordError = err.response.data.password[0];
                            }

                        })
                }

            }
        },

    }
</script>

<style scoped lang="scss">

    .field_error{
        color: red;
        text-align: center;
        margin-bottom: 5px;
    }
    .main-page{
        min-height: 100vh;
        font-family: "PT Sans";
    }

    .main-page__header{
        position: absolute;
        right: 0;
        top: 53px;
        width: 45%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .main-logo{
        display: flex;
        align-items: center;
        width: 327px;
    }

    .main-logo__text{
        font-family: "PT Sans";
        color: $dark-blue;
        font-size: 18px;
        letter-spacing: 0.67px;
        text-align: right;
        text-transform: uppercase;
        margin-top: 20px;
    }

    .main-logo__img{
        margin-left: 26px;
    }

    .main-page__content{
        display: flex;
        min-height: calc(100vh - 70px);
    }

    .image-section{
        background-color: $dark-blue;
        opacity: 0.9;
        flex: 1;
        position: relative;
    }

    .image-section__img{
        position: absolute;
        right: 54px;
        bottom: 104px;
    }

    .form-section{
        flex: 1;
        display: flex;
        align-items: center;
        min-height: 640px;
    }

    .authorization-form{
        //margin-top: 375px;
        margin-left: 125px;
        width: 327px;
    }

    .main-page__footer{
        background-color: $dark-blue;
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 273px;
    }

    .social{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 190px;
    }

    .main-site-link{
        font-family: "PT Sans";
        text-decoration: none;
        font-size: 1.5em;
        color: white;
        letter-spacing: 0px;
    }

    @media(max-width: 1355px){
        .image-section__img{
            width: 380px;
        }

        .main-page__footer{
            padding: 0 150px;
        }
    }

    @media(max-width: 979px){
        .main-page__header{
            margin-top: 24px;
            margin-bottom: 20px;
            position: static;
            width: 100%;
        }

        .main-page__content{
            flex-direction: column;
            display: block;
        }

        .image-section{
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .image-section__img{
            position: static;
            height: 90%;
        }

        .form-section{
            padding: 71px 36px;
            min-height: auto;
        }

        .authorization-form{
            margin: 0;
            width: 100%;
        }

        .main-page__footer{
            flex-direction: column;
            padding: 36px 36px;
        }
    }

    @media(max-width: 380px){
        .image-section{
            height: 350px;
        }

        .image-section__img{
            position: static;
            width: 80%;
        }
    }



</style>


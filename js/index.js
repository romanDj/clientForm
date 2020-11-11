Vue.config.devtools = true;
Vue.use(window.vuelidate.default);
const {required, minValue, numeric, minLength, maxLength, helpers} = window.validators;


Vue.component('create-client-form', {
    data: function () {
        return {
            client: {
                family: '',
                name: '',
                patronymic: '',
                birthday: '',
                phone: '',
                gender: '',
                client_group: [],
                doctor: '',
                is_send: false
            },
            address: {
                index: '',
                country: '',
                region: '',
                city: '',
                street: '',
                house: ''
            },
            document: {
                type_document: '',
                series: '',
                number: '',
                issued: '',
                date_issued: ''
            }
        };
    },
    validations: {
        client: {
            family: {
                required
            },
            name: {
                required
            },
            birthday: {
                required
            },
            phone: {
                required,
                numeric,
                startWithSeven: (value) => {
                    return !helpers.req(value) || String(value)[0] == '7';
                },
                minLength: minLength(11),
                maxLength: maxLength(11)
            },
            client_group: {
                required
            }
        },
        address: {
            city: {
                required
            }
        },
        document: {
            type_document: {
                required
            },
            date_issued: {
                required
            }
        }
    },
    methods: {
        onSubmit: function () {
            console.log(JSON.stringify({
                client: this.client,
                address: this.address,
                document: this.document
            }));
            this.$v.$touch();
            if (this.$v.$invalid) {
                alert('проверьте введенные данные!!!');
            } else {
                alert('Новый клиент успешно создан!');
                console.log('Новый клиент успешно создан!');
            }
        }
    },
    template: `<div class="form-block">
        <form v-on:submit.prevent="onSubmit" class="form">
            <h3 class="form-title">Создание клиента</h3>
            <div class="form-field">
                <label for="family" class="form-label">Фамилия : </label>
                <input id="family" type="text"
                 :class="['form-input', {'form-input-invalid': $v.client.family.$error}]"
                v-model.trim="$v.client.family.$model"/>
                <template v-if="$v.client.family.$error">
                    <small class="form-field-invalid" v-if="!$v.client.family.required">
                        Поле "Фамилия" обязательно для заполнения. 
                    </small>
                </template>
                
            </div>
            <div class="form-field">
                <label for="name" class="form-label">Имя : </label>
                <input id="name" type="text"
                 :class="['form-input', {'form-input-invalid': $v.client.name.$error}]"
                v-model.trim="$v.client.name.$model"/>
                 <template v-if="$v.client.name.$error">
                    <small class="form-field-invalid" v-if="!$v.client.name.required">
                        Поле "Имя" обязательно для заполнения. 
                    </small>
                 </template> 
            </div>
            <div class="form-field">
                <label for="patronymic" class="form-label">Отчество : </label>
                <input id="patronymic" type="text" class="form-input"
                v-model.trim="client.patronymic"/>
            </div>
            <div class="form-field">
                <label for="birthday" class="form-label">Дата рождения : </label>
                <input id="birthday" type="date"
                :class="['form-input', {'form-input-invalid': $v.client.birthday.$error}]"
                 v-model.trim="$v.client.birthday.$model"/>
                  <template v-if="$v.client.birthday.$error">
                    <small class="form-field-invalid" v-if="!$v.client.birthday.required">
                        Поле "Дата рождения" обязательно для заполнения. 
                    </small>
                 </template> 
            </div>
            <div class="form-field">
                <label for="phone" class="form-label">Номер телефона : </label>
                <input id="phone" type="text"
                :class="['form-input', {'form-input-invalid': $v.client.phone.$error}]"
                 v-model.trim="$v.client.phone.$model"/>
                  <template v-if="$v.client.phone.$error">
                    <small class="form-field-invalid" v-if="!$v.client.phone.required">
                        Поле "Номер телефона" обязательно для заполнения. 
                    </small>
                    <small class="form-field-invalid" v-if="!$v.client.phone.numeric">
                        В поле "Номер телефона" доступны только цифры. 
                    </small>
                    <small class="form-field-invalid" 
                    v-if="!$v.client.phone.minLength || !$v.client.phone.maxLength">
                        Поле "Номер телефона" должно содержать 11 цифр. 
                    </small>
                     <small class="form-field-invalid" v-if="!$v.client.phone.startWithSeven">
                        Номер телефона должен начинатся с 7. 
                    </small>
                 </template> 
            </div>
            <div class="form-field">
                <p class="form-label">Пол : </p>
                
                <div class="form-field-radio">
                    <input type="radio" id="male" name="gender" value="male"
                    v-model="client.gender">
                    <label for="male">мужчина</label> 
                </div>
                
                <div class="form-field-radio">
                    <input type="radio" id="female" name="gender" value="female"
                    v-model="client.gender">
                    <label for="female">женщина</label> 
                </div>
            </div>
            <div class="form-field">
                <label for="client-group" class="form-label">Группа клиентов : </label>
                <select size="4" multiple id="client-group" name="client-group[]" 
                 :class="['form-input', {'form-input-invalid': $v.client.client_group.$error}]"
                    v-model="$v.client.client_group.$model">
                    <option value="VIP">VIP</option>
                    <option value="Проблемные">Проблемные</option>
                    <option value="ОМС">ОМС</option>
                </select>
                <template v-if="$v.client.client_group.$error">
                    <small class="form-field-invalid" v-if="!$v.client.client_group.required">
                        Должна быть выбрана хотя бы одна группа. 
                    </small>
                 </template> 
            </div>
            <div class="form-field">
                <label for="doctor" class="form-label">Лечащий врач : </label>
                <select v-model="client.doctor" id="doctor" name="doctor" class="form-input">
                    <option disabled selected>-- выберите врача --</option>
                    <option value="Иванов">Иванов</option>
                    <option value="Захаров">Захаров</option>
                    <option value="Чернышева">Чернышева</option>
                </select>
            </div>
            <div class="form-field form-field-checkbox">
                <input type="checkbox" name="is_send" id="is_send" v-model="client.is_send">
                <label for="is_send">не отправлять СМС</label>
            </div>
            
            <div class="form-subtitle">
                <span class="form-subtitle-text">Адрес</span>    
            </div>
            
             <div class="form-field">
                <label for="index" class="form-label">Индекс : </label>
                <input v-model="address.index" id="index" type="text" class="form-input"/>
            </div>
            
            <div class="form-field">
                <label for="country" class="form-label">Страна : </label>
                <input v-model="address.country" id="country" type="text" class="form-input"/>
            </div>
            
            <div class="form-field">
                <label for="region" class="form-label">Область : </label>
                <input v-model="address.region" id="region" type="text" class="form-input"/>
            </div>
            
            <div class="form-field">
                <label for="city" class="form-label">Город : </label>
                <input id="city" type="text" 
                 :class="['form-input', {'form-input-invalid': $v.address.city.$error}]"
                    v-model="$v.address.city.$model"/>
                    <template v-if="$v.address.city.$error">
                    <small class="form-field-invalid" v-if="!$v.address.city.required">
                        Поле "Город" обязательно для заполнения. 
                    </small>
                 </template> 
            </div>
            
            <div class="form-field">
                <label for="street" class="form-label">Улица : </label>
                <input v-model="address.street" id="street" type="text" class="form-input"/>
            </div>
            
            <div class="form-field">
                <label for="house" class="form-label">Дом : </label>
                <input v-model="address.house" id="house" type="text" class="form-input"/>
            </div>
            
             <div class="form-subtitle">
                <span class="form-subtitle-text">Паспорт</span>    
            </div>
            
            <div class="form-field">
                <label for="type-document" class="form-label">Тип документа : </label>
                <select id="type-document" name="type-document"
                 :class="['form-input', {'form-input-invalid': $v.document.type_document.$error}]"
                v-model="$v.document.type_document.$model">
                    <option disabled selected>-- выберите тип документа --</option>
                    <option value="Паспорт">Паспорт</option>
                    <option value="Свидетельство о рождении">Свидетельство о рождении</option>
                    <option value="Вод. удостоверение">Вод. удостоверение</option>
                </select>
                 <template v-if="$v.document.type_document.$error">
                    <small class="form-field-invalid" v-if="!$v.document.type_document.required">
                        Выберите тип документа.
                    </small>
                 </template> 
            </div>
            
             <div class="form-field">
                <label for="series" class="form-label">Серия : </label>
                <input v-model="document.series" id="series" type="text" class="form-input"/>
            </div>
            
             <div class="form-field">
                <label for="number" class="form-label">Номер : </label>
                <input v-model="document.number" id="number" type="text" class="form-input"/>
            </div>
            
            <div class="form-field">
                <label for="issued" class="form-label">Кем выдан  : </label>
                <input v-model="document.issued" id="issued" type="text" class="form-input"/>
            </div>
            
             <div class="form-field">
                <label for="date-issued" class="form-label">Дата выдачи  : </label>
                <input id="date-issued" type="date"
                 :class="['form-input', {'form-input-invalid': $v.document.date_issued.$error}]"
                v-model="$v.document.date_issued.$model"/>
                <template v-if="$v.document.date_issued.$error">
                    <small class="form-field-invalid" v-if="!$v.document.date_issued.required">
                        Поле "Дата выдачи" обязательно для заполнения. 
                    </small>
                 </template> 
            </div>
            
            <button class="btn btn-success">Создать</button>    
        </form>
    </div>`
});

const app = new Vue({
    el: '#app'
});
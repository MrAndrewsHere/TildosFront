function merge() {
    return Array.from(arguments).reduce((accum, curr) => {
        return Object.assign(accum, curr)
    }, {});
}

function prop(name, val, type, stack, desc, styleElement) {
    return {
        name: name,
        val: val,
        styleElement: styleElement,
        type: type,
        stack: stack,

        desc: desc,

    }
}

function align(args) {
    return {
        align: merge(
            prop(
                'Выравнивание',
                'center',
                'select',
                'align',
                '',
                'text-align'
            ),
            args,
        )
    };
}
function paddingtop(val, stack,name) {
    return prop(
        name||'Отступ сверху',
        val || '105px',
        'select',
        stack || 'linepadding',
        '',
        'padding-top'
    )
}

function paddingbottom(val, stack,name) {
    return prop(
        name||'Отступ снизу',
        val || '45px',
        'select',
        stack || 'linepadding',
        '',
        'padding-bottom'
    )
}
function effect(args) {
    return {
        effect: merge(
            prop(
                'Эффект при скролле',
                'fixed',
                'select',
                'scrolleffect',
                '',
                ''
            ),
            args,
        )
    };
}

function tcol(val) {
    return prop(
        'Ширина',
        val || 8,
        'select',
        'tcol',
    )
}

function tprefix(val) {
    return prop(
        'Отступ слева',
        val || 2,
        'select',
        'tprefix',
    )
}
function borderRadius(name,value) {

    return prop(name||'Радиус скругления углов',value||'','text');
}
function  headalign(value) {
   return align(value||'center', 'Выравнивание заголовочной секции блока')
}
function letterspacing(name,value) {
return prop(
    'Межбуквенное расстояние'+' '+name,
    value||'0px',
    'select',
    'letterspacing',
    '',
    'letter-spacing');
}
function vmargin(name, val) {

    return prop(
        name||'Вертикальный отступ между элементами',
        val||'',
        'text',
        '',
        '',
        'margin-top');
}
function colcount(value) {
   return prop('Кол-во блоков в ряду', value||3, 'select', 'colcount')
}
function backgroundcolor(name,value) {

    return prop(
        name||'Цвет фона',
        value||'#FFFFFFFF',
        'color',
        '',
        '',
        'background-color')
}
function props(componentProps) {

    return Object.assign({

        tmplclass:'',
        tcol:tcol(),
        tprefix:tprefix(),
        backgroundcolor: backgroundcolor(),
        paddingtop: paddingtop('150px'),
        paddingbottom: paddingbottom('150px'),
        align: align(),
    },componentProps);
}


function blockTMPL(name,image,component,code,describe,props,fillable,settings) {

    return {
        name:name||'Название компонента',
        image: image||'https://assets.tildacdn.com/files/tplsthumbs_new/tpl_512_9782.png',
        component: component||'',
        version:'001',
        code: code||'',
        describe: describe||'',
        props:props||[],
        settings:settings||[],
        fillable:fillable||[]
    }
}
function textblock(name, val, type, dclass, color, fontsize, weight, lineheight, texttransform, paddingtop, paddingbottom) {
    return Object.assign(prop(name, val, type),
        styleText(name,dclass, color, fontsize, weight, lineheight, texttransform, paddingtop, paddingbottom),
        )

}

function menuitem(name, val, type, dclass, color, fontsize, weight, lineheight, texttransform, paddingtop, paddingbottom) {
    return Object.assign(textblock(name||'Пункты меню', val, type, dclass, color, fontsize, weight||'600', lineheight, texttransform, paddingtop, paddingbottom), {
        margin:prop('Расстояние между пунктами меню','0 50' || '','select','menuitemmargin'),
        letterspacing: letterspacing(),

    })
}

function submenuitem(name, val, type, dclass, color, fontsize, weight, lineheight, texttransform, paddingtop, paddingbottom) {
    return Object.assign(textblock(name||'Подпункты меню', val, type, dclass, color, fontsize, weight||'500', lineheight, texttransform, paddingtop, paddingbottom),
        {
            letterspacing: letterspacing(),
            backgroundcolor:backgroundcolor('','#ffffff'),
           borderwieght:prop('Подменю: толщина бордюра/обводки','0px','text'),
           bordercolor:prop('Подменю: цвет бордюра/обводки','','color'),
           align:align(),
           width:prop('Подменю: ширина','','text'),
          marginTop:prop('Подменю: отступ сверху','','text'),
          submenuicon:prop('Показывать иконку меню второго уровня',true,'boolean'),
            boxshadow: prop('Подменю размер тени','1px','text'),

        }
        )

}



function boxshadowPX(name,value) {

    return prop(name||'Тень: размер',value||'','text')
}

function unvisible(name,value) {

    return prop(name||'Непрозрачность тени',value||'','select','unvisible');
}
function link(linkinit, target) {

    return {
        linkinit: linkinit || 'href',
        target: target || false
    }
}

function btnprops(textcolor,backgroundcolor,size,bordersize,bordercolor,borderradius) {

    return {
        size: prop('Размер кнопки', size||'', 'select', 'sizebtn'),
        textcolor: prop('Цвет текста', textcolor||'#000000', 'color'),
        backgroundcolor: prop('Цвет фона', backgroundcolor||'#ffffff', 'color'),
        bordercolor: prop('Цвет бордюра', bordercolor||'#975524', 'color'),
        bordersize: prop('Толщина бордюра/обводки', bordersize||'0px', 'text'),
        borderradius: prop('Радиус скругления бордюра', borderradius||'0px', 'text'),
        fontweight:prop('Шрифт: насыщенность','','select','fontweight')
    }

}

function alink(name, val, linkinit, target) {

    return Object.assign(prop(name || 'Ссылка', val || '', 'link'), link(linkinit, target))

}

function btn(name, val, linkinit, target, btnname) {

    return Object.assign(prop(name || 'Ссылка для кнопки', val || '', 'link'), link(linkinit, target), {
        text: prop('Текст кнопки', btnname||'Кнопка', 'text'),
    }, btnprops())
}

function rawBtn(btnname,linkname, linkinit, target) {

    return Object.assign(
        {btnname: prop('Текст кнопки', btnname||'Кнопка', 'text')},
        {link: alink(linkname||'Ссылка для кнопки','',linkinit, target)},

        )
}





function mailrecipirnt(name) {
    return prop(name||'Получатели','','parsetext','parsemail','Укажите получателей через ; (например, example@mail.com; example2@mail.com)')

}

function rawText(name,value) {
    return prop(name||'Текст',value||'текст','text');
}
function rawTitle(name,value) {
   return rawText(name||'Заголовок',value||'');

}
function rawSubtitle(name,value) {
    return rawText(name||'Подзаголовок',value||'');

}
function rawDescription(name,value) {
    return rawText(name||'Описание',value||'');

}
function styleText(name,dclass,color,fontsize,weight,lineheight,texttransform,paddingtopV,paddingbottomV) {
return {
    class: dclass || '',
    color: prop(name + ':цвет', color || '#000000FF', 'color','','','color'),
    fontsize: prop(name + ':размер шрифта', fontsize || '', 'text','','','font-size'),
    weight: prop(name + ':насыщенность', weight || '', 'select', 'fontweight','','font-weight'),
    lineheight: prop(name + ':межстрочное расстояние', lineheight || '', 'text','','','line-height'),
    texttransform: prop(name + ':регистр', texttransform, 'select', 'texttransform','','text-transform'),
    paddingtop: paddingtop( paddingtopV || '0px','',name + ':отступ сверху',),
    paddingbottom: paddingbottom( paddingbottomV || '0px','',name + ':отступ снизу',),
}
}
function title(val) {
    return textblock('Заголовок', val, 'text')
}

function description(val) {
    return textblock('Описание', val, 'text')
}

function subtitle(val) {
    return textblock('Подзаголовок', val, 'text')
}


function visiblerange(min, max) {
    return prop('Диапазон видимости на устройствах', {min: min, max: max}, 'vrange')

}

function positionmenu(name, val) {
    return prop(name || 'Поведение позиционирования меню', val || 'static', 'select', 'positionmenu')

}

function valign(val) {
    return prop(
        'Горизонтальное выравнивание',
        val || 'middle',
        'select',
        'valign',
    )
}


function formfield(name,type,varname,placeholder,title,subtitle,tooltip,elements) {
    return Object.assign(prop(name,[],prop('Тип поля',type||'new','select','fieldtype'),),{

        title:prop('Заголовок поля','','text'),

       subtitle:prop('Подаголовок поля','','text'),

        chb_label:prop('Лейбл','','text'),
        def_val:prop('Отмечено по умолчанию',false,'boolean'),
        require:prop('Обязательно для заполнения',false,'boolean'),
        li_variants:prop('Варианты значения','','textarea','','Пречислите варианты, отделяя их переносом строки'),
        li_selfirstvar:prop('Первый вариант в списке с пустым значением','','text','','Показывается первым в списке. Например: Выберите вариант из списка...'),
        li_radcb:prop('Вид ответа','single','select','answertype'),
        li_defselitem:prop('Номер варианта по умолчанию','','text','','Укажите номер в списке. Например: 1'),
        varname:prop('Имя переменной    ',varname,'text','','Системное название для идентификации данных из разных полей (не отображается). Рекомендуется использовать латиницу. Не обязательно для заполнения.'),
        placeholder:prop('Подсказка значения',placeholder||'','text'),
        rowscount:prop('Количество строк','3','select','rowscount'),
        elements:elements|| []
    })

}





function imgfield(args) {
    return merge(
        prop(
            '',
            '',
            'img',
            '',
            '',
            ''
        ),
        args,
    );
}


 export let tmpls = [

    {
        categoriename: 'Обложка',
        values: [
            blockTMPL(
                'Обложка',
                '/img/templates/tpl_114n.png',
                'cov01',
                'CV1',
                'Логотип на фоне',
                merge(
                    {cov_img:imgfield({name:'Фоновое изображение',val:'/img/templates/k193ae0001914.jpg'})},
                    {logo:imgfield({name:'Логотип',val:'/img/templates/TP_450.png'})},
                    {logosize:prop('Ширина логотипа', '200px', 'text')},
                    effect(),
                    align(),
                ),
                [
                    'cov_img',
                    'logo'
                ],
                [
                    'effect',
                    'align',
                    'logosize',
                ]
            ),

            {
                code: 'CV2',
                name: 'Обложка',
                image: 'https://assets.tildacdn.com/files/tplsthumbs_new/tpl_018n.png',
                describe: 'заголовок, подзаголовок и раздел',
                component: 'cov02',
                props: {
                    cov_img: imgfield('Фоновое изображение', 'https://static.tildacdn.com/tild3736-3037-4334-b863-353562353039/d946dbce69a24e0288d5.jpg'),
                    uptitle: textblock('Подзаголовок',
                        'OUR COMPANY', 'text', 't001__uptitle t-uptitle t-uptitle_sm', '"#FFFFFFFF"', '', '', '', 'uppercase'),
                    title: textblock('Заголовок', 'Bring your ideas to life', 'text', 't001__title t-title t-title_xl', "#FFFFFFFF"),
                    descr: textblock('Описание', 'Anything you\'ve even dreamed about is possible to realise just at the moment when you decided to win.',
                        'textarea', 't001__descr t-descr t-descr_xl t001__descr_center', "#FFFFFFFF"),
                    effect: effect(),
                    align: align(),
                    valign: valign(),
                },
                fillable: [
                    'uptitle',
                    'title',
                    'descr',
                    'cov_img',
                ],
                settings: [
                    'effect',
                    'align',
                    'valign',
                    {
                        name: 'Типографика',
                        fields: [
                            'color',
                            'fontsize',
                            'weight',
                            'texttransform',
                            'paddingtop',
                            'paddingbottom'
                        ],
                        values: [
                            'uptitle',
                            'title',
                            'descr'
                        ]

                    },
                ],

            },
            {
                code: 'CV3',
                name: 'Обложка',
                image: 'https://assets.tildacdn.com/files/tplsthumbs_new/tpl_046n.png',
                describe: 'заголовок и подзаголовок',
                component: 'cov03',
                props: {
                    cov_img: imgfield('Фоновое изображение', 'https://static.tildacdn.com/tild6535-6435-4030-b436-313637366437/2216eb25006b4dc2bcef04fa37361abb.jpg'),
                    title: textblock('Заголовок', 'Open your mind to new experiences', 'text', 't032__title t-title t-title_md', "#FFFFFFFF"),
                    descr: textblock('Описание', 'Getting things done is a process. It demands accountability, and has clear goals. Follow through is the most valuable asset to any organisation. Successful teams ask questions, evaluate reality, and navigate toward specific solutions.',
                        'textarea', 't032__descr t-descr t-descr_lg', "#FFFFFFFF"),
                    effect: effect(),
                    valign: valign(),
                },
                fillable: [
                    'title',
                    'descr',
                    'cov_img',
                ],
                settings: [
                    'effect',
                    'valign',
                    {
                        name: 'Типографика',
                        comp: '',
                        fields: [
                            'color',
                            'fontsize',
                            'weight',
                            'texttransform',
                            'paddingtop',
                            'paddingbottom'
                        ],
                        values: [

                            'title',
                            'descr'

                        ]

                    },
                ],

            },

        ]

    },
    {
        categoriename: 'Заголовок',
        values: [
            {
                code: 'TL01',
                name: 'Заголовок:01',
                image: 'https://assets.tildacdn.com/files/tplsthumbs_new/tpl_60.png',
                component: 'titlewrap',
                describe: 'опционально: подзаголовок, описание',
                props: {
                    backgroundcolor: {
                        val: "#FFFFFFFF",
                        name: 'Цвет фона',
                        desc: '',
                        type: 'color',
                    },
                    tmplsclass: 't050',
                    uptitle: textblock('Подзаголовок', 'Maureen Zehring', 'text', 't050__uptitle t-uptitle t-uptitle_sm', '', '', '', '', 'uppercase'),
                    title: textblock('Заголовок', "How to write headlines that actually work?", 'text', 't050__title t-title t-title_xxl'),
                    descr: textblock('Описание', "A headline's purpose is to quickly and briefly draw attention to the story. " +
                        "It is generally written by a copy editor, but may also be written by the writer," +
                        " the page layout designer, or other editors.",
                        'textarea', 't050__descr t-descr t-descr_xxl'),
                    align: align(),
                    tcol: tcol(10),
                    tprefix: tprefix(1),
                    paddingtop: paddingtop('120px'),
                    paddingbottom: paddingbottom('90px'),
                },
                fillable: [
                    'uptitle',
                    'title',
                    'descr',

                ],
                settings: [
                    'tcol',
                    'tprefix',
                    'align',
                    'paddingtop',
                    'paddingbottom',
                    'backgroundcolor',
                    {
                        name: 'Типографика',
                        comp: '',
                        fields: [
                            'color',
                            'fontsize',
                            'weight',
                            'texttransform',
                            'paddingtop',
                            'paddingbottom'
                        ],
                        values: [
                            'uptitle',
                            'title',
                            'descr'

                        ]

                    },
                ],
            },
            {
                code: 'TL02',
                name: 'Заголовок:02',
                image: 'https://assets.tildacdn.com/files/tplsthumbs_new/tpl_30.png',
                component: 'titlewrap',
                describe: 'опционально: раздел и подзаголовок',
                props: {
                    backgroundcolor: {
                        val: "#FFFFFFFF",
                        name: 'Цвет фона',
                        desc: '',
                        type: 'color',
                    },
                    tmplclass: 't015',
                    uptitle: textblock('Подзаголовок', 'QUENTIN TARANTINO & ROGER AVARY', 'text', 't015__uptitle t-uptitle t-uptitle_md', '', '', '', 'uppercase'),
                    title: textblock('Заголовок', "Pulp Fiction (1994)", 'text', 't015__title t-title t-title_lg'),
                    descr: textblock('Описание', "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of " +
                        "diner bandits intertwine in four tales of violence and redemption.",
                        'textarea', 't015__descr t-descr t-descr_xl'),
                    align: align(),
                    tcol: tcol(),
                    tprefix: tprefix(2),
                    paddingtop: paddingtop('105px'),
                    paddingbottom: paddingbottom('75px'),
                },

                fillable: [
                    'uptitle',
                    'title',
                    'descr',

                ],
                settings: [
                    'tcol',
                    'tprefix',
                    'align',
                    'paddingtop',
                    'paddingbottom',
                    'backgroundcolor',
                    {
                        name: 'Типографика',
                        comp: '',
                        fields: [
                            'color',
                            'fontsize',
                            'weight',
                            'texttransform',
                            'paddingtop',
                            'paddingbottom'
                        ],
                        values: [
                            'uptitle',
                            'title',
                            'descr'

                        ]

                    },
                ],
            },
            {
                code: 'TL03',
                name: 'Заголовок:03',
                describe: 'опционально: описание',
                component: 'titlewrap',
                image: 'https://assets.tildacdn.com/files/tplsthumbs_new/tpl_43.png',
                props: {
                    backgroundcolor: {
                        val: "#FFFFFFFF",
                        name: 'Цвет фона',
                        desc: '',
                        type: 'color',
                    },
                    tmplsclass: 't030',
                    title: textblock('Заголовок', "Designing Brand Identity", 'text', 't030__title t-title t-title_xxs'),
                    descr: textblock('Описание', "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits in" +
                        "tertwine in four tales of violence and redemption.",
                        'textarea', 't030__descr t-descr t-descr_md'),
                    align: align(),
                    tcol: tcol(10),
                    tprefix: tprefix(1),
                    paddingtop: paddingtop('105px'),
                    paddingbottom: paddingbottom('60px'),
                },
                fillable: [
                    'title',
                    'descr',

                ],
                settings: [
                    'tcol',
                    'tprefix',
                    'align',
                    'paddingtop',
                    'paddingbottom',
                    'backgroundcolor',
                    {
                        name: 'Типографика',
                        comp: '',
                        fields: [
                            'color',
                            'fontsize',
                            'weight',
                            'texttransform',
                            'paddingtop',
                            'paddingbottom'
                        ],
                        values: [

                            'title',
                            'descr'

                        ]

                    },
                ],
            },
            {
                code: 'TL04',
                name: 'Заголовок:04',
                describe: 'опционально: раздел и описание',
                component: 'titlewrap',
                image: 'https://assets.tildacdn.com/files/tplsthumbs_new/tpl_33.png',
                props: {
                    backgroundcolor: {
                        val: "#FFFFFFFF",
                        name: 'Цвет фона',
                        desc: '',
                        type: 'color',
                    },
                    tmplsclass: 't030',
                    uptitle: textblock('Подзаголовок', "BASICS", 'text', 't017__uptitle t-uptitle t-uptitle_md'),
                    title: textblock('Заголовок', "Why typography matters?",
                        'text', 't017__title t-title t-title_xxs'),
                    align: align(),
                    tcol: tcol(10),
                    tprefix: tprefix(1),
                    paddingtop: paddingtop('135px'),
                    paddingbottom: paddingbottom('90px'),
                },
                fillable: [
                    'uptitle',
                    'title',

                ],
                settings: [
                    'tcol',
                    'tprefix',
                    'align',
                    'paddingtop',
                    'paddingbottom',
                    'backgroundcolor',
                    {
                        name: 'Типографика',
                        comp: '',
                        fields: [
                            'color',
                            'fontsize',
                            'weight',
                            'texttransform',
                            'paddingtop',
                            'paddingbottom'
                        ],
                        values: [

                            'uptitle',
                            'title',


                        ]

                    },
                ],
            }
        ]
    },
    {
        categoriename: 'Преимущества',
        values: [
            {
                code: 'FR01',
                name: 'Список с иконками',
                image: 'https://assets.tildacdn.com/files/tplsthumbs_new/tpl_512_9782.png',
                component: 'listwrap',
                describe: '',
                props: {
                    backgroundcolor: {
                        val: "#FFFFFFFF",
                        name: 'Цвет фона',
                        desc: '',
                        type: 'color',
                    },
                    title: textblock('Заголовок', 'Our features', 'text'),
                    describe: textblock('Описание', 'Everyday we work hard to make life of our clients better and happier', 'text')
                    ,
                    imgwidth: prop('Ширина изображения', '60px', 'text', '', 'Max: 100px'),

                    tmplclass: 't508',
                    headeralign: headalign(),
                    itemcontentpadding: prop('Отступ между иконкой и текстом', '40px', 'text'),
                    itemcontentmarginbottom: prop('Вертикальный отступ между элементами', '50px', 'text'),
                    titleitemstyle: textblock('Заголовок элемента списка', '', 'text'),
                    descritemstyle: textblock('Описание элемента списка', '', 'text'),
                    tcol: tcol(8),
                    btn: btn(),
                    paddingtop: paddingtop('150px'),
                    paddingbottom: paddingbottom('150px'),
                    tprefix: tprefix(2),
                    newitem: {
                        icon: imgfield('Иконка', 'https://static.tildacdn.com/tild3763-6461-4836-b261-353035633734/1.svg'),
                        title: prop('Заголовок', 'Hight Quality', 'text'),
                        descriptions: prop('Описание', "We are the leading firm by delivering quality and value to our clients. All our professionals have more than 5 years " +
                            "of legal experiences. We like what we do."
                            , 'textarea'),
                        link: alink(),
                        hidden: false,
                    },
                    items: [
                        {
                            icon: imgfield('Иконка', 'https://static.tildacdn.com/tild3763-6461-4836-b261-353035633734/1.svg'),
                            title: prop('Заголовок', 'Hight Quality', 'text'),
                            descriptions: prop('Описание', "We are the leading firm by delivering quality and value to our clients. All our professionals have more than 5 years " +
                                "of legal experiences. We like what we do."
                                , 'textarea'),
                            link: alink(),
                            hidden: false,

                        },
                        {
                            icon: imgfield('Иконка', 'https://static.tildacdn.com/tild6630-3033-4237-a564-646431313432/2.svg'),
                            title: prop('Заголовок', 'Support', 'text'),
                            descriptions: prop('Описание', 'Our managers are always ready to answer your questions. You can call us at the weekends and at night. Also you can ' +
                                'visit our office for personal consultation.', 'textarea'),
                            link: alink(),
                            hidden: false,
                        },
                        {
                            icon: imgfield('Иконка', 'https://static.tildacdn.com/tild3639-3963-4966-a466-626164333934/4.svg'),
                            title: prop('Заголовок', 'Individual Approach', 'text'),
                            descriptions: prop('Описание', 'Our company works according to the principle of individual approach to every client. This method lets us to get success in problems of all levels.', 'textarea'),
                            link: alink(),
                            hidden: false,
                        },
                    ]
                },
                fillable: [

                    'title',
                    'describe',
                    'btn',
                    {
                        name: 'Карточки',
                        type: 'dynamic',
                        items: [

                            'title',
                            'descriptions',
                            'icon',
                            'link'
                        ],
                        newitem: 'newitem',

                    },
                ],
                settings: [
                    'headeralign',
                    'tcol',
                    'tprefix',
                    'imgwidth',
                    'itemcontentpadding',
                    'itemcontentmarginbottom',
                    'backgroundcolor',
                    // 'align',
                    'paddingtop',
                    'paddingbottom',

                    {
                        name: 'Типографика',
                        comp: '',
                        fields: [
                            'color',
                            'fontsize',
                            'weight',
                            'texttransform',
                            'paddingtop',
                            'paddingbottom'
                        ],
                        values: [

                            'title',
                            'describe',
                            'titleitemstyle',
                            'descritemstyle'

                        ]

                    },
                    {
                        name: 'Стиль кнопки',
                        comp: '',
                        fields: [
                            'backgroundcolor',
                            'bordercolor',
                            'textcolor',
                            'size',
                            'bordersize',
                            'borderradius'
                        ],
                        values: [

                            'btn',
                        ]

                    },
                ],

            },
            {
                code: 'FR02',
                name: 'Колонки с большими иконками',
                image: 'https://assets.tildacdn.com/files/tplsthumbs_new/tpl_490_1631.png',
                component: 'listwrap',
                describe: '',
                props: {
                    backgroundcolor: {
                        val: "#FFFFFFFF",
                        name: 'Цвет фона',
                        desc: '',
                        type: 'color',
                    },
                    title: textblock('Заголовок', 'Our advantages', 'text'),
                    describe: textblock('Описание', 'Everyday we work hard to make life of our clients better and happier', 'text'),
                    headeralign: headalign(),
                    colcount: colcount(),
                    stylecol: prop('Стиль', 1, 'select', 'stylecol'),
                    align: align(),
                    imgwidth: prop('Ширина изображения', '100px', 'text', '', 'Max: 100px'),

                    tmplclass: 't490',

                    itemcontentpadding: prop('Отступ между иконкой и текстом', '40px', 'text'),
                    itemcontentmarginbottom: prop('Вертикальный отступ между элементами', '90px', 'text'),
                    titleitemstyle: textblock('Заголовок элемента списка', '', 'text'),
                    descritemstyle: textblock('Описание элемента списка', '', 'text'),

                    btn: btn(),
                    paddingtop: paddingtop('150px'),
                    paddingbottom: paddingbottom('150px'),

                    newitem: {
                        icon: imgfield('Иконка', 'https://static.tildacdn.com/tild3663-6162-4638-b264-376336656234/1.svg'),
                        title: prop('Заголовок', 'Quality', 'text'),
                        descriptions: prop('Описание', "All our professionals have more than 5 years of legal experiences."
                            , 'textarea'),
                        link: alink(),
                        hidden: false,
                    },
                    items: [
                        {
                            icon: imgfield('Иконка', 'https://static.tildacdn.com/tild3663-6162-4638-b264-376336656234/1.svg'),
                            title: prop('Заголовок', 'Quality', 'text'),
                            descriptions: prop('Описание', "All our professionals have more than 5 years of legal experiences."
                                , 'textarea'),
                            link: alink(),
                            hidden: false,

                        },
                        {
                            icon: imgfield('Иконка', 'https://static.tildacdn.com/tild3464-3434-4837-b033-653337643236/2.svg'),
                            title: prop('Заголовок', 'Support', 'text'),
                            descriptions: prop('Описание', 'We offer you professional consultation of our specialist in 30 minutes.', 'textarea'),
                            link: alink(),
                            hidden: false,
                        },
                        {
                            icon: imgfield('Иконка', 'https://static.tildacdn.com/tild3632-6665-4232-a636-306661333033/3.svg'),
                            title: prop('Заголовок', 'Price', 'text'),
                            descriptions: prop('Описание', 'Our prices are fixed for some standard services.', 'textarea'),
                            link: alink(),
                            hidden: false,
                        },
                    ]
                },
                fillable: [

                    'title',
                    'describe',
                    'btn',
                    {
                        name: 'Карточки',
                        type: 'dynamic',
                        items: [

                            'title',
                            'descriptions',
                            'icon',
                            'link'
                        ],
                        newitem: 'newitem',

                    },
                ],
                settings: [
                    'headeralign',
                    'colcount',
                    'align',
                    'imgwidth',
                    'itemcontentpadding',
                    'itemcontentmarginbottom',
                    'backgroundcolor',
                    // 'align',
                    'paddingtop',
                    'paddingbottom',

                    {
                        name: 'Типографика',
                        comp: '',
                        fields: [
                            'color',
                            'fontsize',
                            'weight',
                            'texttransform',
                            'paddingtop',
                            'paddingbottom'
                        ],
                        values: [

                            'title',
                            'describe',
                            'titleitemstyle',
                            'descritemstyle'

                        ]

                    },
                    {
                        name: 'Стиль кнопки',
                        comp: '',
                        fields: [
                            'backgroundcolor',
                            'bordercolor',
                            'textcolor',
                            'size',
                            'bordersize',
                            'borderradius'
                        ],
                        values: [

                            'btn',
                        ]

                    },
                ],
            }
        ]


    },
    {
        categoriename: 'Меню',


        values: [
            {
                code: 'ME01',
                name: 'Меню с логотипом слева',
                image: 'https://assets.tildacdn.com/files/tplsthumbs_new/tpl_456_7935.png',
                component: 'menuwrap',
                describe: 'ссылки на страницы справа',
                props: {
                    tmplclass: 't456',
                    positionmenu: positionmenu(),
                    height: prop('Высота меню', '80px', 'text'),
                    backgroundcolor: {
                        val: "#FFFFFFFF",
                        name: 'Цвет фона',
                        desc: '',
                        type: 'color',
                    },
                    burger:prop('Показывать «бургер» в мобильной версии',true,'boolean'),
                    mobilename:prop('Название мобильного меню','','text'),
                    logo: imgfield('Изображение', 'https://static.tildacdn.com/tild3461-3939-4233-b764-376537343337/logoSmall.png'),
                    logosize: prop('Ширина логотипа', '80px', 'text', '', 'Max: 80px'),
                    logolink: alink('Ссылка логотипа'),
                    menucolwidth: prop('Размер контейнера меню', '', 'select', 'menucolwidth'),
                   menuitemstyle: menuitem('Пункты меню', '', 'text','','','','600'),
                   submenuitemstyle: submenuitem('Подпункты меню', '', 'text','','','','600'),
                    paddingtop:paddingtop('0px'),
                    paddingbottom: paddingbottom('0px'),
                    boxshadow:prop('Тень меню','','select','boxshadow'),
                    sitename:prop('Название меню','Company','text'),
                    sitenamecolor:prop('Название меню: цвет','#000000','color'),
                    sitenamemarginleft:prop('Название меню: отступ слева','5px','text'),
                    firstBackground:{
                        val: "#FFFFFFFF",
                        name: 'Цвет фона верхнего блока',
                        desc: '',
                        type: 'color',
                    },
                    secondBackground:{
                        val: "#ffffff",
                        name: 'Цвет фона нижнего блока',
                        desc: '',
                        type: 'color',
                    },

                    align:align('right','Выравнивание пунктов меню'),
                    newitem: {link: alink(),
                        linkname: prop('Название ссылки', 'New', 'text'),
                        subitems:[],
                    },
                    newsubitem:{
                        link: alink(),
                        linkname: prop('Название ссылки', 'New', 'text'),
                    },
                    items: [
                        {
                            link: alink(),
                            linkname: prop('Название', 'Works', 'text'),
                            subitems:[]

                        },
                        {
                            link: alink(),
                            linkname: prop('Название', 'About', 'text'),
                            subitems:[{
                                link: alink(),
                                linkname: prop('Название ссылки', 'New', 'text'),
                            }],
                        },
                        {
                            link: alink(),
                            linkname: prop('Название', 'About', 'text'),
                            subitems:[{
                                link: alink(),
                                linkname: prop('Название ссылки', 'New', 'text'),
                            }],
                        },
                    ]

                },
                fillable: [
                    {
                        name: 'Логотип',
                        type: 'usual',
                        items: [
                            'logo',
                            'logolink',
                        ]


                    },
                    {
                        name: 'Список пунктов меню',
                        type: 'dynamic',
                        component: 'MenuItemsCard',
                        items: [
                            'linkname',
                            'link',

                        ],
                        newitem: 'newitem',

                    },
                    'sitename',
                    'mobilename',
                ],
                settings: [
                    'positionmenu',
                    'backgroundcolor',
                    'firstBackground',
                    'secondBackground',
                    'sitenamecolor',
                    'sitenamemarginleft',
                    'align',
                    'logosize',

                    'menucolwidth',
                    'boxshadow',
                    'burger',

                    {
                        name: 'Меню',
                        comp: '',
                        fields: [
                            'color',
                            'fontsize',
                            'weight',
                            'texttransform',
                            'margin',
                            'letterspacing'

                        ],
                        values: [
                            'menuitemstyle',
                        ]

                    },

                    {
                        name: 'Подменю',
                        comp: '',
                        fields: [
                            'color',
                            'fontsize',
                            'weight',
                            'texttransform',
                            'letterspacing',
                            'backgroundcolor',
                            'borderwieght',
                            'bordercolor',
                            'align',
                            'width',
                            'marginTop',
                            'boxshadow',
                            'submenuicon'

                        ],
                        values: [
                            'submenuitemstyle'
                        ]

                    },
                ],

            }
        ],

    },
    {
        categoriename: 'Форма',
        values: [
            {
                code: 'BF204N',
                name: 'Вертикальная форма с множеством полей',
                image: 'https://assets.tildacdn.com/files/tplsthumbs_new/tpl_t186c.png',
                component: 'formwrap',
                tmpl:'t678',
                describe: '',
                props: {
                    paddingtop:paddingtop('105px'),
                    paddingbottom: paddingbottom('105px'),
                    tcol: tcol(),
                    tprefix: tprefix(),
                    newitem:formfield(),
                    descr: textblock('Подзаголовок', '', 'text', '', '', '', '', '','uppercase'),
                    title: textblock('Заголовок', "", 'text', '','','','','','uppercase'),
                    mailrecipirnt:mailrecipirnt('Приём данных из формы'),
                    textunderform:textblock('Текст под формой','','text'),
                    items:[
                        formfield('Email','email','','email','Ваш email','','')
                    ],

                },
                fillable: [
                    {
                        name: 'Шапка блока',
                        type: 'usual',
                        component:'',
                        items: [
                            'title',
                            'descr'
                        ],


                    },
                    {
                        name: 'Поля для ввода',
                        type: 'dynamic',
                        component:'FormFieldCard',
                        items: [
                        ],
                        newitem: 'newitem',

                    },
                    'mailrecipirnt',
                    'textunderform'

                ],
                settings: [],
            }
        ]
    },
    {categoriename: 'Карточки',
    values:[

 //FR01
        blockTMPL(
            'Простые карточки',
            '/img/templates/tpl_650.png',
            'listwrap',
            'TE01',
            'Колонки с простыми карточками',
            props(
                {

                    backgroundcolor:backgroundcolor('','#efefef'),
                    title:title('FAQs'),
                    description:description('Do you have some questions? Find answers below!'),
                    headeralign: headalign(),
                    colcount:colcount(),
                    tmplclass:'t650',
                    filter:{
                        fields:prop('Поля для фильтрации','name,age','text',''),
                        enable:prop('Включить фильтр',true,'boolean'),
                    },
                    itemsStyle:{
                        align:align('left'),
                        backgroundcolor:backgroundcolor('Цвет фона для карточек'),
                        borderRadius:borderRadius('','5px'),
                        boxshadow:boxshadowPX('','15px'),
                        vmargin:vmargin(),
                        unvisible:unvisible('','0.2'),
                        title:styleText('Заголовок'),
                        description:styleText('Описание'),
                        btnprops:btnprops('#ff8562','#ffffff'),
                    },
                    newitem:{
                        title:rawTitle('','Page Actions'),
                        description:rawDescription('','How to add a link to a certain spot in theproject'),
                        btn:rawBtn('Learn More'),
                        filterField:prop('Фильтр','','text','Например, name:MyName, age:18'),
                    },
                    items:[
                        {
                            title:rawTitle('','Page Actions'),
                            description:rawDescription('','How to add a link to a certain spot in theproject'),
                            btn:rawBtn('Learn More'),
                            filterField:prop('Фильтр','name:Andrews,age:20','text','Например, name:MyName, age:18'),

                        },
                        {
                            title:rawTitle('','Page Actions'),
                            description:rawDescription('','How to add a link to a certain spot in theproject'),
                            btn:rawBtn('Learn More'),
                            filterField:prop('Фильтр','name:Alabama, age:28','text','Например, name:MyName, age:18'),
                        },
                        {
                            title:rawTitle('','Page Actions'),
                            description:rawDescription('','How to add a link to a certain spot in theproject'),
                            btn:rawBtn('Learn More'),
                            filterField:prop('Фильтр','','text','Например, name:MyName, age:18'),
                        },
                        {
                            title:rawTitle('','Page Actions'),
                            description:rawDescription('','How to add a link to a certain spot in theproject'),
                            btn:rawBtn('Learn More'),
                            filterField:prop('Фильтр','','text','Например, name:MyName, age:18'),
                        }
                        ,
                        {
                            title:rawTitle('','Page Actions'),
                            description:rawDescription('','How to add a link to a certain spot in theproject'),
                            btn:rawBtn('Learn More'),
                            filterField:prop('Фильтр','','text','Например, name:MyName, age:18'),
                        }
                        ,
                        {
                            title:rawTitle('','Page Actions'),
                            description:rawDescription('','How to add a link to a certain spot in theproject'),
                            btn:rawBtn('Learn More'),
                            filterField:prop('Фильтр','','text','Например, name:MyName, age:18'),
                        }


                    ]
                }
            ),


            [
                {
                    name: 'Фильтр',
                    type: 'usual',
                    component:'',
                    items: [
                        'filter'
                    ],


                },
                {
                    name: 'Карточки',
                    type: 'dynamic',
                    items: [

                        'title',
                        'description',
                        'btn',
                        'filterField'

                    ],
                    newitem: 'newitem',

                },

            ],
            [
                'headeralign',
                'colcount',

                'backgroundcolor',
                {
                    name: 'Шапка',

                    fields: [

                        'color',
                        'fontsize',
                        'weight',
                        'texttransform',
                        'paddingtop',
                        'paddingbottom'

                    ],
                    values: [
                        'title',
                        'description',
                    ]


                },

                {
                    name: 'Карточки',
                    comp: '',
                    fields: [
                        'align',
                        'backgroundcolor',
                        'borderRadius',
                        'boxshadow',
                        'vmargin',
                        'unvisible',


                    ],
                    values: [

                        'itemsStyle',


                    ]

                },
                {
                    name: 'Типографика карточки',
                    comp: '',
                    fields: [

                        'title',
                        'description',

                    ],
                    values: [

                        'itemsStyle',


                    ]

                },
                {
                    name: 'Кнпоки',
                    comp: '',
                    fields: [

                        'btnprops',
                    ],
                    values: [

                        'itemsStyle',


                    ]

                },
            ],

        ),

 //FR02

    ]
    }


]


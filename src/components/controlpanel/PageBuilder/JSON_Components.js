class Prop {

    replace(replacementArray) {

        if (!replacementArray || Object.keys(replacementArray).length === 0) {
            return this
        }
        Object.keys(replacementArray).forEach((element) => {
            replacementArray[element] instanceof Object ?
                this[element].replace(replacementArray[element]) :
                this[element] = replacementArray[element];

        });
        return this;
    }

    concat(concatArray) {

        if (!concatArray || concatArray.length === 0) {
            return this
        }
        Object.keys(this).forEach((element) => {

            if (this[element] instanceof Object) {
                Object.keys(concatArray).forEach((concatKey) => {

                    this[element][concatKey] += concatArray[concatKey];
                })
            }

        });
        return this;
    }

}

function prop(name, val, type, stack, desc, styleElement) {
    return merge({
        name: name, val: val, type: type, stack: stack, desc: desc, styleElement: styleElement
    });
}

function merge() {
    return Array.from(arguments).reduce((accum, curr) => {
        return Object.assign(accum, curr)
    }, new Prop());
}

function multiplicationItems(item, count) {
    return Array(count).fill(item, 0, count);

}

function mailrecipirnt(name) {
    return prop(name || 'Получатели', '', 'parsetext', 'parsemail', 'Укажите получателей через ; (например, example@mail.com; example2@mail.com)')

}


function align(args) {
    return merge(
        prop(
            'Выравнивание',
            'center',
            'select',
            'align',
            '',
            'text-align'
        ),
        args,
    );
}

function paddingtop(args) {
    return merge(
        prop(
            'Отступ сверху',
            '',
            'select',
            'linepadding',
            '',
            'padding-top'
        ),
        args,
    );

}

function paddingbottom(args) {
    return merge(
        prop(
            'Отступ снизу',
            '',
            'select',
            'linepadding',
            '',
            'padding-bottom'
        ),
        args,
    );

}

function effect(args) {
    return merge(
        prop(
            'Эффект при скролле',
            'fixed',
            'select',
            'scrolleffect',
            '',
            ''
        ),
        args,
    );
}

function borderRadius(args) {
    return merge(
        prop(
            'Радиус скругления углов',
            '',
            'text',
            '',
            '',
            'border-radius'
        ),
        args,
    );
}

function letterspacing(args) {
    return merge(
        prop(
            'Межбуквенное расстояние',
            '0px',
            'select',
            'letterspacing',
            '',
            'letter-spacing'
        ),
        args,
    );
}


function boxshadow(args) {
    return merge(
        prop(
            'Тень: размер',
            '#00000000 0px 0px 0px 0px',
            'boxshadow',
            '',
            '',
            'box-shadow'
        ),
        args,
    );
}

function unvisible(args) {
    return merge(
        prop(
            'Непрозрачность тени',
            '',
            'select',
            'unvisible',
            '',
            'box-shadow'
        ),
        args,
    );

}

function valign(args) {
    return merge(
        prop(
            'Горизонтальное выравнивание',
            'middle',
            'select',
            'valign',
            '',
            ''
        ),
        args,
    );
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

function vmargin(args) {
    return merge(
        prop(
            'Вертикальный отступ между элементами',
            '',
            'text',
            '',
            '',
            'margin-top'
        ),
        args,
    );
}

function colcount(args) {
    return merge(
        prop(
            'Кол-во блоков в ряду',
            3,
            'select',
            'colcount',
            '',
            ''
        ),
        args,
    );
}

function backgroundcolor(args) {
    return merge(
        prop(
            'Цвет фона',
            '#FFFFFFFF',
            'color',
            '',
            '',
            'background-color'
        ),
        args,
    );
}

function tprefix(args) {
    return merge(
        prop(
            'Отступ слева',
            2,
            'select',
            'tprefix',
            '',
            ''
        ),
        args,
    );
}

function color(args) {
    return merge(prop(
        'Цвет',
        '#ffffff',
        'color',
        '',
        '',
        'color'
    ), args);
}

function positionmenu(name, val) {
    return prop(name || 'Поведение позиционирования меню', val || 'static', 'select', 'positionmenu')

}

function tcol(args) {
    return merge(prop(
        'Ширина',
        8,
        'select',
        'tcol',
        '',
        ''
    ), args);

}

function btnsize(args) {
    return merge(prop(
        'Размер ',
        '',
        'select',
        'sizebtn',
        '',
        ''
    ), args);
}

function fontsize(args) {
    return merge(
        prop(
            'Размер шрифта',
            '',
            'text',
            '',
            '',
            'font-size'
        ),
        args
    );

}

function lineheight(args) {
    return merge(
        prop(
            'Межстрочное расстояние',
            '',
            'text',
            '',
            '',
            'line-height'
        ),
        args
    );

}

function treeLinkLayout(args) {
    return merge(
        prop(
            'linkLayout',
            'bezier',
            'select',
            'treeLinkLayout',
            '',
            ''
        ),
        args
    );

}

function treeType(args) {
    return merge(
        prop(
            'Type',
            'tree',
            'select',
            'treeType',
            '',
            ''
        ),
        args
    );

}
function treeLayoutType(args) {
    return merge(
        prop(
            'layoutType',
            'horizontal',
            'select',
            'treeLayoutType',
            '',
            ''
        ),
        args
    );

}
function texttransform(args) {
    return merge(
        prop(
            'Регистр символов',
            '',
            'select',
            'texttransform',
            '',
            'text-transform'
        ),
        args
    );

}

function fontweight(args) {
    return merge(prop(
        'Шрифт: насыщенность',
        '',
        'select',
        'fontweight',
        '',
        'font-weight'
    ), args);
}

function border(args) {
    return merge(
        prop(
            'Бордюр: размер',
            '0px solid #000000',
            'border',
            '',
            '',
            'border'
        ),
        args
    );

}

function styleLink(args) {

    return merge(
        {size: btnsize()},
        {textcolor: color({name: 'Цвет текста', val: '#000000'})},
        {backgroundcolor: backgroundcolor()},
        {weight: fontweight()},
        args
    );
}

function rawlink(args) {
    return merge(prop(
        'Ссылка',
        '',
        'link',
        '',
        '',
        ''
        ),
        {linkinit: 'href'},
        {target: false},
        {linkname: 'Название'},
        {class: ''},
        args);
}

function rawBtn(args) {

    return merge(
        rawlink({name: 'Кнопка'}),
        args
    );
}

function btn(args) {

    return merge(
        rawBtn(),
        styleLink(),
        args
    );
}

function link(args) {
    return merge(
        rawlink(),
        styleLink(),
        args
    );

}

function styleSubmitBtn(args) {

    return merge(
        {size: btnsize()},
        {backgroundcolor: backgroundcolor({name: 'Цвет фона кнопки'})},
        {borderRadius: borderRadius({val: '0px'})},
        {border: border()},
        {boxshadow: boxshadow({val: '#00000020 0px 0px 0px 0px'})},
        styleText(),
        args
    );
}

function SubmitBtn(args) {
    return merge(
        prop('Текст кнопки', '', 'text'),
        styleSubmitBtn(),
        args
    );
}

function rawText(args) {
    return merge(prop(
        'Текст',
        'текст',
        'text',
        '',
        '',
        ''
        ),
        args);

}

function cov_height(args) {
    return merge(prop(
        'Высота',
        '100vh',
        'text',
        '',
        'example: 700px (or 100vh. Units: px - pixels, vh - viewport height)',
        'height'
        ),
        args);
}

function tcolwidth(args) {

    return merge(
        prop(
            'Ширина',
            '',
            'select',
            'colwidth'
        )
    )
}

function styleText(args) {
    return merge(
        {class: ''},
        {color: color({val: '#000000'})},
        {fontsize: fontsize()},
        {weight: fontweight()},
        {lineheight: lineheight()},
        {texttransform: texttransform()},
        {paddingtop: paddingtop()},
        {paddingbottom: paddingbottom()},
        {align:align('center')},
        args
    );

}

function menuitemmargin(args) {

    return merge(
        prop(
            'Расстояние между пунктами меню',
            '0 50',
            'select',
            'menuitemmargin',
            '',
            ''
        ),
        args
    );
}

function menuitem(args) {
    return merge(
        rawText({name: 'Пункты меню'}),
        styleText().replace({weight: {val: 600}}).concat({name: ': пункты меню'}),
        {margin: menuitemmargin()},
        {letterspacing: letterspacing()},
        args);
}

function formfield(args) {
    return merge(
        prop('', [], prop('Тип поля', 'new', 'select', 'fieldtype')),
        {title: rawTitle({name: 'Заголовок поля'})},

        {subtitle: rawSubtitle({name: 'Подаголовок поля'})},

        {chb_label: prop('Лейбл', '', 'text')},
        {def_val: prop('Отмечено по умолчанию', false, 'boolean')},
        {require: prop('Обязательно для заполнения', false, 'boolean')},
        {li_variants: prop('Варианты значения', '', 'textarea', '', 'Пречислите варианты, отделяя их переносом строки')},
        {
            li_selfirstvar: prop('Первый вариант в списке с пустым значением', '', 'text', '', 'Показывается первым в списке.' +
                ' Например: Выберите вариант из списка...')
        },
        {li_radcb: prop('Вид ответа', 'single', 'select', 'answertype')},
        {li_defselitem: prop('Номер варианта по умолчанию', '', 'text', '', 'Укажите номер в списке. Например: 1')},
        {
            varname: prop('Имя переменной', '', 'text', '', 'Системное название для идентификации данных из разных полей' +
                ' (не отображается). Рекомендуется использовать латиницу. Не обязательно для заполнения.')
        },
        {placeholder: prop('Подсказка значения', '', 'text')},
        {rowscount: prop('Количество строк', '3', 'select', 'rowscount')},
        {elements: []},
        args
    );

}

function submenucontainer(args) {

    return merge(
        {backgroundcolor: backgroundcolor({val: '#a00b0b'}),},
        {border: border({val: '2px solid #000000'})},
        {align: align()},
        {width: prop('Подменю: ширина', '', 'text')},
        {marginTop: vmargin({name: 'Подменю: отступ сверху'})},
        {submenuicon: prop('Показывать иконку меню второго уровня', true, 'boolean')},
        {boxshadow: boxshadow({name: 'Подменю размер тени'})},
        args
    );
}

function submenuitem(args) {
    return merge(
        rawText({name: 'Подпункты меню'}),
        styleText().replace({weight: {val: 500}}).concat({name: ': подпункты меню'}),
        {letterspacing: letterspacing()},
        args);
}

function text(args) {
    return merge(
        rawText(),
        styleText().concat({name: ': текст'}),
        args
    );
}

function rawTitle(args) {
    return merge(
        rawText(
            {name: 'Заголовок'})
        ,
        args)

}

function rawSubtitle(args) {
    return merge(
        rawText(
            {name: 'Подзаголовок'})
        ,
        args)

}

function rawDescription(args) {
    return merge(
        rawText(
            {name: 'Описание'})
        ,
        args)

}

function title(args) {
    return merge(
        rawTitle(),
        styleText().concat({name: ': заголовок'}),
        args
    )
}

function subtitle(args) {
    return merge(
        rawSubtitle(),
        styleText().concat({name: ': подзаголовок'}),
        args
    );
}

function filter_brightness(args) {

    return merge(
        prop(
            'Непрозрачность',
            '30%',
            'select',
            'unvisible2'
        )
    )
}
function cover_img(args) {
    return merge(
        {effect: effect()},
        {cov_h:cov_height()},
        {filter:filter_brightness()},
        {cov_img:imgfield({name:'Фоновое изображение'})},


    )

}
function description(args) {
    return merge(
        rawDescription(),
        styleText().concat({name: ': описание'}),
        args
    );
}


function defProps(args) {
    return merge(
        {backgroundcolor: backgroundcolor()},
        {paddingtop: paddingtop()},
        {paddingbottom: paddingbottom()},
        {hidden: false},
        {version: '0.0.1'},
        {id:""},
        args
    );

}

function spliceDefAr(target, source) {
    source.forEach((element) => {
        target.splice(element[1], 0, element[0]);
    });
    return target;
}

function defSettings(array) {

    let defSettings = [
        // ['item',2],

    ];

    return spliceDefAr(array, defSettings);
}

function defFillable(array) {


    let defFillable = [
        // ['item',2],
    ];

    return spliceDefAr(array, defFillable);
}

function blockTMPL(name, image, component, code, describe, props, fillable, settings) {

    return {
        name: name || 'Название компонента',
        image: image || '/img/templates/tpl_114n.png',
        component: component || '',
        code: code || '',
        describe: describe || '',
        props: props || [],
        fillable: fillable || [],
        settings: settings || [],
    }
}

export let JSON_Components = [

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
                        {default: defProps()},
                        {cov_img:imgfield({name:'Фоновое изображение',val:'/img/templates/k193ae0001914.jpg'})},
                        {cover:cover_img().replace({cov_img:{val:'/img/templates/k193ae0001914.jpg'}})},
                        {logo: imgfield({name: 'Логотип', val: '/img/templates/TP_450.png'})},
                        {logosize: prop('Ширина логотипа', '200px', 'text')},
                        {align: align()},
                    ),
                    [

                       'cov_img',
                        'logo'
                    ],
                    [
                        'cover',
                        'align',
                        'logosize',


                    ]
                ),
                blockTMPL(
                    'Обложка',
                    '/img/templates/tpl_018n.png',
                    'cov02',
                    'CV2',
                    'заголовок, подзаголовок и раздел',
                    merge(
                        {default: defProps()},
                        {cov_img: imgfield({name: 'Фоновое изображение', val: '/img/templates/d946dbce69a24e0288d5.jpg'})},
                        {cover:cover_img().replace({cov_img:{val:'/img/templates/d946dbce69a24e0288d5.jpg'}})},
                        {
                            subtitle: subtitle(
                                {
                                    val: 'our company',
                                    class: 't001__uptitle t-uptitle t-uptitle_sm',
                                }
                            ).replace({texttransform: {val: 'uppercase'}})
                        },
                        {
                            title: title(
                                {
                                    val: 'Bring your ideas to life',
                                    class: 't001__title t-title t-title_xl',

                                }
                            )
                        },
                        {
                            description: description({
                                val: 'Anything you\'ve even dreamed about is possible to realise just at the moment when you decided to win.',
                                class: 't001__descr t-descr t-descr_xl t001__descr_center',
                                type: 'textarea',
                            })
                        },


                        {align: align()},
                        {valign: valign()},
                    ),
                    [
                        'subtitle',
                        'title',
                        'description',
                        'cov_img',
                    ],
                    [
                       'cover',
                        'align',
                        'valign',

                        {
                            name: 'Типографика',
                            fields: [
                                'color',
                                'fontsize',
                                'align',
                                'weight',
                                'texttransform',
                                'paddingtop',
                                'paddingbottom'
                            ],
                            values: [
                                'subtitle',
                                'title',
                                'description'
                            ]

                        },


                    ]
                ),

                blockTMPL(
                    'Обложка',
                    '/img/templates/tpl_046n.png',
                    'cov03',
                    'CV3',
                    'заголовок и подзаголовок',
                    merge(
                        {default: defProps()},
                        {cov_img: imgfield({name: 'Фоновое изображение', val: '/img/templates/2216eb25006b4dc2bcef04fa37361abb.jpg'})},
                        {cover:cover_img().replace({cov_img:{val:'/img/templates/2216eb25006b4dc2bcef04fa37361abb.jpg'}})},
                        {
                            title: title(
                                {
                                    val: 'Open your mind to new experiences',
                                    class: 't032__title t-title t-title_md',

                                }
                            )
                        },
                        {
                            description: description({
                                val: 'Getting things done is a process. It demands accountability, and has clear goals.' +
                                    ' Follow through is the most valuable asset to any organisation. ' +
                                    'Successful teams ask questions, evaluate reality, and navigate toward specific solutions.',
                                class: 't032__descr t-descr t-descr_lg',

                            })
                        },

                        {effect: effect()},
                        {align: align()},
                        {valign: valign()},
                    ),
                    [

                        'title',
                        'description',
                        'cov_img',
                    ],
                    [
                        'cover',
                        'align',
                        'valign',
                        {
                            name: 'Типографика',
                            fields: [
                                'color',
                                'fontsize',
                                'align',
                                'weight',
                                'texttransform',
                                'paddingtop',
                                'paddingbottom'
                            ],
                            values: [
                                'title',
                                'description'
                            ]

                        },


                    ]
                )


            ]
        },
        {
            categoriename: 'Заголовок',
            values: [
                blockTMPL(
                    'Заголовок:01',
                    '/img/templates/tpl_60.png',
                    'titlewrap',
                    'TL01',
                    'опционально: подзаголовок, описание',
                    merge(
                        {
                            default: defProps().replace({
                                    paddingtop: {val: '105px'},
                                    paddingbottom: {val: '75px'}
                                }
                            )
                        },
                        {
                            subtitle: subtitle(
                                {
                                    val: 'Maureen Zehring',
                                    class: 't050__uptitle t-uptitle t-uptitle_sm',
                                }
                            ).replace({
                                texttransform: {val: 'uppercase'},
                                color: {val: '#000000'}
                            })
                        },
                        {
                            title: title(
                                {
                                    val: 'How to write headlines that actually work?',
                                    class: 't050__title t-title t-title_xxl',

                                }
                            ).replace({
                                color: {val: '#000000'}
                            })
                        },
                        {
                            description: description({
                                val: "A headline's purpose is to quickly and briefly draw attention to the story. " +
                                    "It is generally written by a copy editor, but may also be written by the writer," +
                                    " the page layout designer, or other editors.",
                                class: 't050__descr t-descr t-descr_xxl',
                                type: 'textarea',

                            }).replace({
                                color: {val: '#000000'}
                            })
                        },
                        {tmplclass: 't015'},
                        {tcol: tcol()},
                        {tprefix: tprefix()},
                        {align: align()},
                    ),
                    [

                        'subtitle',
                        'title',
                        'description',

                    ],
                    [

                        'tcol',
                        'tprefix',
                        'align',
                        'default',
                        {
                            name: 'Типографика',
                            fields: [
                                'color',
                                'align',
                                'fontsize',
                                'weight',
                                'texttransform',
                                'paddingtop',
                                'paddingbottom'
                            ],
                            values: [
                                'subtitle',
                                'title',
                                'description'
                            ]

                        },


                    ]
                ),
                blockTMPL(
                    'Заголовок:02',
                    '/img/templates/tpl_30.png',
                    'titlewrap',
                    'TL02',
                    'опционально: раздел и подзаголовок',
                    merge(
                        {
                            default: defProps().replace({
                                    paddingtop: {val: '105px'},
                                    paddingbottom: {val: '75px'}
                                }
                            )
                        },
                        {
                            subtitle: subtitle(
                                {
                                    val: 'QUENTIN TARANTINO & ROGER AVARY',
                                    class: 't015__uptitle t-uptitle t-uptitle_md',
                                }
                            ).replace({
                                texttransform: {val: 'uppercase'},
                                color: {val: '#000000'}
                            })
                        },
                        {
                            title: title(
                                {
                                    val: "Pulp Fiction (1994)",
                                    class: 't015__title t-title t-title_lg',

                                }
                            ).replace({
                                color: {val: '#000000'}
                            })
                        },
                        {
                            description: description({
                                val: "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of " +
                                    "diner bandits intertwine in four tales of violence and redemption.",
                                class: 't015__descr t-descr t-descr_xl',
                                type: 'textarea',

                            }).replace({
                                color: {val: '#000000'}
                            })
                        },
                        {tmplclass: 't015'},
                        {tcol: tcol()},
                        {tprefix: tprefix()},
                        {align: align()},
                    ),
                    [

                        'subtitle',
                        'title',
                        'description',

                    ],
                    [

                        'tcol',
                        'tprefix',
                        'align',
                        'default',
                        {
                            name: 'Типографика',
                            fields: [
                                'color',
                                'align',
                                'fontsize',
                                'weight',
                                'texttransform',
                                'paddingtop',
                                'paddingbottom'
                            ],
                            values: [
                                'subtitle',
                                'title',
                                'description'
                            ]

                        },


                    ]
                ),
                blockTMPL(
                    'Заголовок:03',
                    '/img/templates/tpl_43.png',
                    'titlewrap',
                    'TL03',
                    'опционально: описание',
                    merge(
                        {
                            default: defProps().replace({
                                    paddingtop: {val: '105px'},
                                    paddingbottom: {val: '60px'}
                                }
                            )
                        },
                        {
                            title: title(
                                {
                                    val: 'Designing Brand Identity',
                                    class: 't030__title t-title t-title_xxs',

                                }
                            ).replace({
                                color: {val: '#000000'}
                            })
                        },
                        {
                            description: description({
                                val: "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits in" +
                                    "tertwine in four tales of violence and redemption.",
                                class: 't030__descr t-descr t-descr_md',
                                type: 'textarea',

                            }).replace({
                                color: {val: '#000000'}
                            })
                        },
                        {tmplclass: 't030'},
                        {tcol: tcol({val: 10})},
                        {tprefix: tprefix({val: 1})},
                        {align: align()},
                    ),
                    [

                        'title',
                        'description',

                    ],
                    [

                        'tcol',
                        'tprefix',
                        'align',
                        'default',
                        {
                            name: 'Типографика',
                            fields: [
                                'color',
                                'align',
                                'fontsize',
                                'weight',
                                'texttransform',
                                'paddingtop',
                                'paddingbottom'
                            ],
                            values: [

                                'title',
                                'description'
                            ]

                        },


                    ]
                ),
                blockTMPL(
                    'Заголовок:02',
                    '/img/templates/tpl_33.png',
                    'titlewrap',
                    'TL02',
                    'опционально: раздел и описание',
                    merge(
                        {
                            default: defProps().replace({
                                    paddingtop: {val: '135px'},
                                    paddingbottom: {val: '90px'}
                                }
                            )
                        },
                        {
                            subtitle: subtitle(
                                {
                                    val: "BASICS",
                                    class: 't017__uptitle t-uptitle t-uptitle_md'
                                }
                            ).replace({

                                color: {val: '#000000'}
                            })
                        },
                        {
                            title: title(
                                {
                                    val: "Why typography matters?",
                                    class: 't017__title t-title t-title_xxs'

                                }
                            ).replace({
                                color: {val: '#000000'}
                            })
                        },

                        {tmplclass: 't030'},
                        {tcol: tcol({val: 10})},
                        {tprefix: tprefix({val: 1})},
                        {align: align()},
                    ),
                    [

                        'subtitle',
                        'title',

                    ],
                    [

                        'tcol',
                        'tprefix',
                        'align',
                        'default',
                        {
                            name: 'Типографика',
                            fields: [
                                'color',
                                'align',
                                'fontsize',
                                'weight',
                                'texttransform',
                                'paddingtop',
                                'paddingbottom'
                            ],
                            values: [
                                'subtitle',
                                'title',

                            ]

                        },


                    ]
                )
            ]
        },
        {
            categoriename: 'Изображение',
            values:[
                blockTMPL(
                    'Изображение',
                    '/img/templates/tpl_3.png',
                    'IM01',
                    'IM01',
                    '',
                    merge(
                        {
                            default: defProps().replace({

                                    paddingtop: {val: '75px'},
                                    paddingbottom: {val: '75px'},
                                }
                            )
                        },
                        {img:imgfield({name:'Изображение',val:'/img/templates/imgfish.jpg'})},
                        {link:rawlink()},
                        {text:text({name:'Текст под изображением',val:''})},
                        {colwidth:tcolwidth()},
                    ),
                    [
                        'img',
                        'link',
                        'text'
                    ],
                    [
                        'colwidth',
                        'default',
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
                                'text',
                            ]

                        }
                    ]
                ),
                blockTMPL(
                    'Текст на картинке с длинным скроллом',
                    '/img/templates/tpl_237.png',
                    'IM05',
                    'IM05',
                    '',
                    merge(
                        {
                            default: defProps()
                        },
                        {cover:cover_img({val:'/img/templates/f9c22c58.png'})},
                        {cov_img:imgfield({name:'Фоновое изображение',val:'/img/templates/f9c22c58.jpg'})},
                        {text:text({
                                type:'textarea',
                                val:"Front matter, or preliminaries, is the first section of a book, and is usually the smallest section in terms of the number of pages. Each page is counted, but no folio or page number is expressed, or printed, on either display pages or blank pages.<br><br>To produce perfect books, these rules have to be brought back to life and applied.<br>"
                            }).replace({color:{val:'#FFFFFFFF'}})},
                        {tcol:tcol({val:6})},
                        {tprefix:tprefix({val:6})},
                        {textbackground:backgroundcolor({name:'Цвет фона текста',val:'#000000FF'})},
                        {valign:valign({val:'bottom'})},
                    ),
                    [
                        'text',
                        'cov_img'
                    ],
                    [
                        'tcol',
                        'tprefix',
                        'cover',
                        'default',
                        'valign',
                        'textbackground',
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
                                'text',
                            ]

                        }
                    ]
                ),
                blockTMPL(
                    'Текст и изображение',
                    '/img/templates/tpl_223.png',
                    'IM10',
                    'IM10',
                    '',
                    merge(
                        {
                            default: defProps().replace({
                                    paddingtop: {val: '75px'},
                                    paddingbottom: {val: '75px'},
                                }
                            )
                        },

                        {img:imgfield({name:'Фоновое изображение',val:'/img/templates/tumblr_nf5uyk6zqO1qa6y0bo1_1280_935.jpg'})},
                        {description:description({name:'Описание изображения',val:''})},
                        {title:title({name:'Заголовок изображения',val:''})},

                        {text:text({
                                type:'textarea',
                                val:"Smoke is a collection of airborne solid and liquid particulates and gases emitted when a material undergoes combustion or pyrolysis, together with the quantity of air that is entrained or otherwise mixed into the mass. <br>It is commonly an unwanted by-product of fires (including stoves, candles, oil lamps, and fireplaces), but may also be used for pest control (fumigation), communication (smoke signals), defensive and offensive capabilities in the military (smoke-screen), cooking, or smoking (tobacco, cannabis, etc.)."
                            })},
                        {tcol:tcol({val:4})},
                        {tprefix:tprefix({val:2})},
                        {tcol2:tcol({name:'Ширина второго блока',val:6})},
                        {tprefix2:tprefix({name:'Отступ слева у второго блока',val:''})},
                        {revert:prop('Отразить по горизонтали',false,'boolean','')},
                        {align:align({name:'Выравнивние текста под изображением ',val:'left'})}

                    ),
                    [
                        'text',
                        'img',
                        'title',
                        'description',

                    ],
                    [
                        'tcol',
                        'tprefix',
                        'tcol2',
                        'tprefix2',
                        'align',

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
                                'description',
                                'text',
                            ]

                        },
                        'default',


                    ]
                ),
                blockTMPL(
                    'Текст с изображением и описанием на полях',
                    '/img/templates/tpl_222.png',
                    'IM11',
                    'IM11',
                    '',
                    merge(
                        {
                            default: defProps().replace({
                                    paddingtop: {val: '75px'},
                                    paddingbottom: {val: '75px'},
                                }
                            )
                        },

                        {img:imgfield({name:'Фоновое изображение',val:'/img/templates/book.jpg'})},
                        {description:description({name:'Описание изображения',type:'textarea',val:'How a Group of Geniuses, and Geeks Created the Digital Revolution'})},
                        {title:title({name:'Заголовок изображения',type:'textarea',val:'The Innovators:'})},

                        {text:text({
                                type:'textarea',
                                val:"Many books have been written about Silicon Valley and the collection of geniuses, eccentrics, and mavericks who launched the \"Digital Revolution\"; Robert X. Cringely's Accidental Empires and Michael A. Hiltzik's Dealers of Lightning are just two excellent accounts of the unprecedented explosion of tech entrepreneurs and their game-changing success. <br><br>But Walter Isaacson goes them one better: The Innovators, his follow-up to the massive (in both sales and size) Steve Jobs, is probably the widest-ranging and most comprehensive narrative of them all. Don't let the scope or page-count deter you: while Isaacson builds the story from the 19th century--innovator by innovator, just as the players themselves stood atop the achievements of their predecessors--his discipline and era-based structure allows readers to dip in and out of digital history, from Charles Babbage's Difference Engine, to Alan Turing."
                            })},
                        {tcol:tcol({val:8})},
                        {tprefix:tprefix({val:2})},
                        {tcol2:tcol({name:'Ширина второго блока',val:2})},
                        {tprefix2:tprefix({name:'Отступ слева у второго блока',val:''})},
                        {revert:prop('Отразить по горизонтали',false,'boolean','')},
                        {align:align({name:'Выравнивние текста под изображением ',val:'left'})}

                    ),
                    [
                        'text',
                        'img',
                        'title',
                        'description',

                    ],
                    [
                        'tcol',
                        'tprefix',
                        'tcol2',
                        'tprefix2',
                        'align',

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
                                'description',
                                'text',
                            ]

                        },
                        'default',


                    ]
                ),

            ]
        },

        {
            categoriename: 'Преимущества',
            values: [
                blockTMPL(
                    'Список с иконками',
                    '/img/templates/tpl_512_9782.png',
                    'listwrap',
                    'FR01',
                    'Колонки с простыми карточками',
                    merge(
                        {
                            default: defProps().replace({

                                    paddingtop: {val: '150px'},
                                    paddingbottom: {val: '150px'},
                                }
                            )
                        },
                        {
                            filter: {

                                enable: prop('Включить фильтр', false, 'boolean'),
                            }
                        },
                        {title: title({val: 'Our features'})},
                        {description: description({val: 'Everyday we work hard to make life of our clients better and happier'})},
                        {headeralign: align({name: 'Выравнивание заголовочной секции блока', val: 'center'})},
                        {tmplclass: 't508'},
                        {tcol: tcol({val: 8})},
                        {tprefix: tprefix({val: 2})},
                        {btn: SubmitBtn()},

                        {
                            itemsStyle: {
                                itemcontentpadding: prop('Отступ между иконкой и текстом', '40px', 'text'),
                                itemcontentmarginbottom: prop('Вертикальный отступ между элементами', '40px', 'text'),

                                imgwidth: prop('Ширина изображения', '60px', 'text', '', 'Max: 100px'),

                                align: align({val: 'left'}),
                                backgroundcolor: backgroundcolor({name: 'Цвет фона для карточек'}),
                                borderRadius: borderRadius({val: '5px'}),
                                boxshadow: boxshadow({val: '#00000020 0px 0px 15px 0px'}),
                                vmargin: vmargin(),

                                title: styleText().concat({name: ': заголовок элемента списка'}),
                                description: styleText().concat({name: ': описание элемента списка'}),
                                btnprops: styleLink().replace({
                                    textcolor: {val: '#ff8562'},
                                    backgroundcolor: {val: '#ffffff'}
                                }),
                            }
                        },
                        {
                            newitem: {
                                icon: imgfield({name: 'Иконка', val: '/img/templates/1.svg'}),
                                title: rawTitle({val: 'Hight Quality'}),
                                description: rawDescription({
                                    val: 'We are the leading firm by delivering quality and value to our clients. All our professionals have more than 5 years ' +
                                        'of legal experiences. We like what we do.'
                                }),
                                link: rawlink(),
                                hidden: false,
                            }
                        },
                        {
                            items: multiplicationItems(
                                {
                                    icon: imgfield({name: 'Иконка', val: '/img/templates/1.svg'}),
                                    title: rawTitle({val: 'Hight Quality'}),
                                    description: rawDescription({
                                        val: 'We are the leading firm by delivering quality and value to our clients. All our professionals have more than 5 years ' +
                                            'of legal experiences. We like what we do.'
                                    }),
                                    link: rawlink(),
                                    hidden: false,
                                }, 4)
                        }
                    ),

                    [
                        'title',
                        'description',
                        'btn',
                        {
                            name: 'Карточки',
                            type: 'dynamic',
                            items: [


                                'title',
                                'description',
                                'icon',
                                'link'

                            ],
                            newitem: 'newitem',

                        },

                    ],
                    [
                        'headeralign',
                        'tcol',
                        'tprefix',
                        'default',
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
                                'itemcontentpadding',
                                'itemcontentmarginbottom',
                                'imgwidth'
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
                            name: 'Кнопка',
                            comp: '',

                            fields: [
                                'size',
                                'color',
                                'fontsize',
                                'weight',
                                'lineheight',
                                'texttransform',
                                'paddingtop',
                                'paddingbottom',
                                'backgroundcolor',
                                'borderRadius',
                                'border',
                                'boxshadow'
                            ],
                            values: [
                                'btn',
                            ]

                        },
                    ],
                ),
                blockTMPL(
                    'Колонки с большими иконками',
                    '/img/templates/tpl_490_1631.png',
                    'listwrap',
                    'FR02',
                    'Колонки с простыми карточками',
                    merge(
                        {
                            default: defProps().replace({

                                    paddingtop: {val: '150px'},
                                    paddingbottom: {val: '150px'},
                                }
                            )
                        },
                        {
                            filter: {

                                enable: prop('Включить фильтр', false, 'boolean'),
                            }
                        },
                        {title: title({val: 'Our advantages'})},
                        {colcount: colcount()},

                        {description: description({val: 'Everyday we work hard to make life of our clients better and happier'})},
                        {headeralign: align({name: 'Выравнивание заголовочной секции блока', val: 'center'})},
                        {tmplclass: 't490'},
                        {btn: SubmitBtn()},

                        {
                            itemsStyle: {
                                itemcontentpadding: prop('Отступ между иконкой и текстом', '20px', 'text'),
                                itemcontentmarginbottom: prop('Вертикальный отступ между элементами', '40px', 'text'),

                                imgwidth: prop('Ширина изображения', '100px', 'text', '', 'Max: 300px'),

                                align: align({name: 'Выравнивание элементов', val: 'center'}),
                                backgroundcolor: backgroundcolor({name: 'Цвет фона для карточек'}),
                                borderRadius: borderRadius({val: '5px'}),
                                boxshadow: boxshadow({val: '#00000020 0px 0px 15px 0px'}),
                                vmargin: vmargin(),

                                title: styleText().concat({name: ': заголовок элемента списка'}),
                                description: styleText().concat({name: ': описание элемента списка'}),

                            }
                        },
                        {
                            newitem: {
                                icon: imgfield({name: 'Иконка', val: '/img/templates/1.svg'}),
                                title: rawTitle({val: 'Quality'}),
                                description: rawDescription({val: 'All our professionals have more than 5 years of legal experiences.'}),
                                link: rawlink(),
                                hidden: false,
                            }
                        },
                        {
                            items: multiplicationItems(
                                {
                                    icon: imgfield({name: 'Иконка', val: '/img/templates/1.svg'}),
                                    title: rawTitle({val: 'Quality'}),
                                    description: rawDescription({val: 'All our professionals have more than 5 years of legal experiences.'}),
                                    link: rawlink(),
                                    hidden: false,
                                }, 4)
                        }
                    ),

                    [
                        'title',
                        'description',
                        'btn',
                        {
                            name: 'Карточки',
                            type: 'dynamic',
                            items: [


                                'title',
                                'description',
                                'icon',
                                'link'

                            ],
                            newitem: 'newitem',

                        },

                    ],
                    [
                        'headeralign',
                        'colcount',
                        'default',
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
                            name: 'Колонки',
                            comp: '',
                            fields: [
                                'align',
                                'itemcontentpadding',
                                'itemcontentmarginbottom',
                                'imgwidth'
                            ],
                            values: [

                                'itemsStyle',


                            ]

                        },
                        {
                            name: 'Типографика',
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
                            name: 'Кнопка',
                            comp: '',

                            fields: [
                                'size',
                                'color',
                                'fontsize',
                                'weight',
                                'lineheight',
                                'texttransform',
                                'paddingtop',
                                'paddingbottom',
                                'backgroundcolor',
                                'borderRadius',
                                'border',
                                'boxshadow'
                            ],
                            values: [
                                'btn',
                            ]

                        },
                    ],
                ),
            ]
        },
        {
            categoriename: 'Меню',
            values: [

                blockTMPL(
                    'Меню с логотипом слева',
                    '/img/templates/tpl_456_7935.png',
                    'menuwrap',
                    'ME01',
                    'ссылки на страницы справа',
                    merge(
                        {tmplclass: 't456'},
                        {default: defProps()},
                        {height: prop('Высота меню', '80px', 'text')},
                        {positionmenu: positionmenu()},
                        {burger: prop('Показывать «бургер» в мобильной версии', true, 'boolean')},
                        {mobilename: prop('Название мобильного меню', '', 'text')},
                        {
                            logo: imgfield({
                                name: 'Изображение',
                                val: '/img/templates/logo_new_small_eng_100.png'
                            })
                        },
                        {logosize: prop('Ширина логотипа', '80px', 'text', '', 'Max: 80px')},
                        {logolink: link({linkname: 'Ссылка логотипа'})},
                        {menucolwidth: prop('Размер контейнера меню', '', 'select', 'menucolwidth')},
                        {menuitemstyle: menuitem()},
                        {submenuitemstyle: submenuitem()},
                        {submenucontainer: submenucontainer()},
                        {boxshadow: boxshadow({name: 'Тень меню'})},
                        {sitename: prop('Название меню', 'Company', 'text')},
                        {sitenamecolor: prop('Название меню: цвет', '#000000', 'color')},
                        {sitenamemarginleft: prop('Название меню: отступ слева', '5px', 'text')},
                        {firstBackground: backgroundcolor({name: 'Цвет фона верхнего блока'})},
                        {secondBackground: backgroundcolor({name: 'Цвет фона нижнего блока'})},
                        {align: align({name: 'Выравнивание пунктов меню', val: 'right'})},
                        {
                            newitem: {
                                link: rawlink(),
                                subitems: [],
                            }
                        },
                        {
                            newsubitem: {
                                link: rawlink(),
                                subitems: [],
                            },
                        },
                        {
                            items: multiplicationItems(
                                {
                                    link: rawlink({linkname: 'New'}),
                                    subitems: [
                                        {
                                            link: rawlink(),
                                            subitems: [],
                                        }
                                    ]

                                },
                                3
                            )
                        }
                    ),
                    [
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
                                'link',
                            ],
                            newitem: 'newitem',

                        },
                        'sitename',
                        'mobilename',
                    ],
                    [
                        'default',
                        'positionmenu',
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
                            name: 'Типографика',
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
                                'submenuitemstyle'
                            ]

                        },

                        {
                            name: 'Подменю',
                            comp: '',
                            fields: [
                                'backgroundcolor',
                                'border',
                                'align',
                                'width',
                                'marginTop',
                                'boxshadow',
                                'submenuicon'

                            ],
                            values: [
                                'submenucontainer'
                            ]

                        },
                    ],
                ),

            ]
        },
        {
            categoriename: 'Форма',
            values: [
                blockTMPL(
                    'Вертикальная форма с множеством полей',
                    '/img/templates/tpl_t186c.png',
                    'formwrap',
                    'BF204N',
                    'Колонки с простыми карточками',
                    merge(
                        {tmpl: 't678'},
                        {
                            default: defProps().replace({
                                    paddingtop: {val: '105px'},
                                    paddingbottom: {val: '105px'},
                                }
                            )
                        },
                        {tcol: tcol()},
                        {tprefix: tprefix()},
                        {newitem: formfield()},
                        {title: title()},
                        {description: description()},
                        {headeralign: align({name: 'Выравнивание заголовочной секции блока', val: 'center'})},
                        {textunderform: rawText({name: 'Текст под формой'})},
                        {mailrecipirnt: mailrecipirnt('Приём данных из формы')},
                        {formname: prop('Название формы', '', 'text', '')},
                        {submitBtn: SubmitBtn({val: 'Send'})},


                        {
                            itemsStyle: {
                                align: align({val: 'left'}),
                                backgroundcolor: backgroundcolor({name: 'Цвет фона для карточек'}),
                                borderRadius: borderRadius({val: '5px'}),
                                boxshadow: boxshadow({val: '#00000020 0px 0px 15px 0px'}),
                                vmargin: vmargin(),

                                title: styleText().concat({name: ': загловок'}),
                                description: styleText().concat({name: ': описание'}),
                                btnprops: styleLink().replace({
                                    textcolor: {val: '#ff8562'},
                                    backgroundcolor: {val: '#ffffff'}
                                }),
                            }
                        },
                        {
                            newitem: formfield()
                        },
                        {
                            items: [
                                formfield().replace({
                                    type: {val: 'email'}
                                })
                            ],
                        }
                    ),

                    [
                        {
                            name: 'Шапка блока',
                            type: 'usual',
                            component: '',
                            items: [
                                'title',
                                'description'
                            ],


                        },
                        {
                            name: 'Поля для ввода',
                            type: 'dynamic',
                            component: 'FormFieldCard',
                            items: [],
                            newitem: 'newitem',

                        },
                        'mailrecipirnt',
                        'formname',

                        'submitBtn',
                        'textunderform',


                    ],
                    [
                        'tcol',
                        'tprefix',
                        'default',
                        {
                            name: 'Кнопка',
                            comp: '',
                            fields: [
                                'backgroundcolor',
                                'borderRadius',
                                'border',
                                'boxshadow'
                            ],
                            values: [
                                'submitBtn',
                            ],
                        }


                    ],
                ),
            ]
        },

        {
            categoriename: 'Карточки',
            values: [
                blockTMPL(
                    'Простые карточки',
                    '/img/templates/tpl_650.png',
                    'listwrap',
                    'TE01',
                    'Колонки с простыми карточками',
                    merge(
                        {
                            default: defProps().replace({
                                    backgroundcolor: {val: '#efefef'},
                                    paddingtop: {val: '150px'},
                                    paddingbottom: {val: '150px'},
                                }
                            )
                        },
                        {title: title({val: 'FAQs'})},
                        {description: description({val: 'Do you have some questions? Find answers below!'})},
                        {headeralign: align({name: 'Выравнивание заголовочной секции блока', val: 'center'})},
                        {colcount: colcount()},
                        {tmplclass: 't650'},
                        {
                            filter: {
                                fields: prop('Поля для фильтрации', 'name,age', 'text', ''),
                                enable: prop('Включить фильтр', true, 'boolean'),
                            }
                        },
                        {
                            itemsStyle: {
                                align: align({val: 'left'}),
                                backgroundcolor: backgroundcolor({name: 'Цвет фона для карточек'}),
                                borderRadius: borderRadius({val: '5px'}),
                                boxshadow: boxshadow({val: '#00000020 0px 0px 15px 0px'}),
                                vmargin: vmargin(),

                                title: styleText().concat({name: ': загловок'}),
                                description: styleText().concat({name: ': описание'}),
                                btnprops: styleLink().replace({
                                    textcolor: {val: '#ff8562'},
                                    backgroundcolor: {val: '#ffffff'}
                                }),
                            }
                        },
                        {
                            newitem: {
                                title: rawTitle({val: 'Page Actions'}),
                                description: rawDescription({val: 'How to add a link to a certain spot in theproject'}),
                                btn: rawBtn({linkname: 'Learn More'}),
                                filterField: prop('Фильтр', 'name:Andrews,age:20', 'text', 'Например, name:MyName, age:18'),

                            }
                        },
                        {
                            items: multiplicationItems(
                                {
                                    title: rawTitle({val: 'Page Actions'}),
                                    description: rawDescription({val: 'How to add a link to a certain spot in theproject'}),
                                    btn: rawBtn({linkname: 'Learn More'}),
                                    filterField: prop('Фильтр', 'name:Andrews,age:20', 'text', 'Например, name:MyName, age:18'),

                                }, 6)
                        }
                    ),

                    [
                        'title',
                        'description',
                        {
                            name: 'Фильтр',
                            type: 'usual',
                            component: '',
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
                        'default',
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
                            name: 'Кнопки',
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
            ]
        },
    {
        categoriename: 'MindMap',
        values: [
            blockTMPL(
                'Tree',
                '/img/templates/d3tree.png',
                'd3tree',
                'D3tree',
                '',
                merge(
                    {
                        default: defProps().replace({
                                backgroundcolor: {val: '#ffffff'},
                                paddingtop: {val: '0px'},
                                paddingbottom: {val: '0px'},
                            }
                        ),
                        data:{
                            id:1,
                            text: "father",
                            children:[{
                                id:2,
                                text: "son1",
                                children:[ { id:4,text: "grandson", children:[]}, { id:5,text: "grandson2", children:[]}]
                            },{
                                id:3,
                                text: "son2",
                                children:[ { id:6,text: "grandson3", children:[]}, { id:7,text: "grandson4", children:[]}]
                            }]
                        },
                        treeType: treeType(),
                        layoutType: treeLayoutType(),
                        linkLayout:treeLinkLayout(),
                        currentId:7,
                        tcol:tcol({val:12}),
                        tprefix:tprefix({val:0}),


                    },


                ),[],[
                    'tcol',
                    'tprefix',
                    'treeType',
                    'layoutType',
                    'linkLayout',
                    'default',
                ])
        ]
    }
    ]
;
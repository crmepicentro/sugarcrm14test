/*
 * Your installation or use of this SugarCRM file is subject to the applicable
 * terms available at
 * http://support.sugarcrm.com/Resources/Master_Subscription_Agreements/.
 * If you do not agree to all of the applicable terms or do not have the
 * authority to bind the entity as an authorized representative, then do not
 * install or use this SugarCRM file.
 *
 * Copyright (C) SugarCRM Inc. All rights reserved.
 */
/**
 * @class View.Views.Base.SidebarQuickcreateView
 * @alias SUGAR.App.view.views.BaseSidebarQuickcreateView
 * @extends View.Views.Base.QuickcreateView
 */
({
    extendsFrom: 'QuickcreateView',

    className: 'flyout-quickcreate min-w-[10rem] max-w-[15rem]',

    /**
     * @inheritdoc
     * @private
     */
    initialize: function (options) {
        app.events.on("app:sync:complete", this.render, this);
        app.view.View.prototype.initialize.call(this, options);

    },
    events: {
        'click [data-action=open-modal]': 'openModal',
        'click [data-action=newtrafico]': 'openUrlDrawer',
        'click [data-action=abrir]': 'openSideDrawer'
    },
    _renderHtml: function () {
        if (!app.api.isAuthenticated() || app.config.appStatus == 'offline') {
            return;
        }
        // loadAdditionalComponents fires render before the private metadata is ready, check for this
        if (app.isSynced) {
            this.createMenuItems = this._getMenuMeta(
                app.metadata.getModuleNames({filter: ['visible', 'quick_create'], access: 'create'})
            );
            console.log(this.createMenuItems);
            app.view.View.prototype._renderHtml.call(this);
        }
    },
    openModal: function () {
        alert('openModal');
        // Trigger del modal
        this.layout.trigger('your-modal-event-name', {
            // Configuración del modal
            title: "Título del Modal",
            span: 6, // Tamaño del modal (1-12, siguiendo el sistema de grid de Bootstrap)

            // Componentes a mostrar en el cuerpo del modal
            components: [
                {
                    view: 'record',
                    context: {
                        module: 'ModuloDeseado',
                        create: true,
                        // Si necesitas pasar un modelo existente:
                        // model: this.model
                    }
                }
            ],

            // Botones personalizados para el encabezado del modal
            buttons: [
                {name: 'cancel', label: 'Cancelar'},
                {name: 'save', label: 'Guardar', primary: true}
            ]
        }, function (model) {
            // Esta función se ejecuta cuando el modal devuelve datos
            console.log("Modal retornó con:", model);
            // Aquí puedes realizar acciones adicionales con el modelo devuelto
        });
    },

    openUrlDrawer: function (event) {
        alert('openUrlDrawer');
        console.log('openUrlDrawer');
        var activeDrawerLayout = app.drawer.getActive(),
            $shortcutButton = this.$('[data-action=newtrafico]');
        var context = this.context;
        var host = document.domain;
        context.position = '';
        context.title = $shortcutButton[0].ariaLabel;
        context.url = host + "/" + $shortcutButton[0].dataset.url;

        if (!activeDrawerLayout || activeDrawerLayout.name !== 'iframelayout') {
            $shortcutButton.addClass('active');
            if (context.url != '') {
                app.drawer.open({
                    layout: 'iframelayout',
                    context: context
                }, function () {
                    $shortcutButton.removeClass('active');
                });
            }
        } else {
            app.drawer.close();
        }
    },
    openSideDrawer: function (event) {
        if (app.sideDrawer && app.sideDrawer.isOpen()) {
            app.sideDrawer.close();
        } else {
            app.sideDrawer.open();
        }
    },
})

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
        console.log('openModal: Open');
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
        console.log('openUrlDrawer');
        var activeDrawerLayout = app.drawer.getActive(),
            $shortcutButton = this.$('[data-action=newtrafico]');
        var context = this.context;
        context.title = "Solicitud de Avalúo : Sistema S3S : Cualquier novedad/inconveniente con esta pantalla del S3S reportarla a <b>IT-CENTRIC</b>";
        context.url ="https://www.casabaca.com/";
        context.typeDrawer='drawer';
        context.hasHeader=true;
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
        $shortcutButton = this.$('[data-action=abrir]');
        console.log('openSideDrawer: Open');
        if (app.sideDrawer && app.sideDrawer.isOpen()) {
            app.sideDrawer.close();
        } else {
            $shortcutButton.addClass('active');
            var context = this.context;
            context.title = "Nuevo Trafico";
            context.typeDrawer='sideDrawer';
            context.hasHeader=false;
            context.url ="https://www.casabaca.com/";
            var drawerConfigs = {
                top: '200px',
                bottom: 0,
                right: 0,
                left: '60%',
            };
            app.sideDrawer.config(drawerConfigs);

            app.sideDrawer.open({
                layout: 'iframelayout',
                context: context,
                hasTitle: true,
                dashboardName: "Nuevo Trafico",
                isFocusDashboard: true,
            }, function () {
                $shortcutButton.removeClass('active');
            }, true);
        }
    },
})

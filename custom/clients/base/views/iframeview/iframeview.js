/*
 * Your installation or use of this SugarCRM file is subject to the applicable
 * terms available at
 * http://support.sugarcrm.com/06_Customer_Center/10_Master_Subscription_Agreements/.
 * If you do not agree to all of the applicable terms or do not have the
 * authority to bind the entity as an authorized representative, then do not
 * install or use this SugarCRM file.
 *
 * Copyright (C) SugarCRM Inc. All rights reserved.
 */
({
    className: 'iframeview', url: '', title: '', context: '',
    initialize: function (options) {
        this._super('initialize', [options]);
        var context = options.context;
        this.context = context;
        this.url = context.url;
        this.typeDrawer = context.typeDrawer;
        this.hasHeader = context.hasHeader;

        let texto = context.title.split(" : ");
        this.title = texto[0];
        this.label = "";
        if (texto.length > 1) {
            this.label = texto[1];
            this.more = texto[2];
        }

        this.botones = '';
        var obj_this = this;
            obj_this.render();

    },
    events: {
        'click [name=cancel_button]': 'closeIframe',
    },
    closeIframe: function () {
        this.model.fetch();
        _.each(this.model._relatedCollections, function (collection) {
            collection.fetch({relate: true});
        });
        if (this.typeDrawer=='drawer' ){
            app.drawer.close();
        }
        if (this.typeDrawer=='sideDrawer' ){
            app.sideDrawer.close();
        }

    }
})


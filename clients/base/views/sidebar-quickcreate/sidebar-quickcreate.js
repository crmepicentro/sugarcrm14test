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
    initialize: function(options) {
        app.events.on("app:sync:complete", this.render, this);
        app.view.View.prototype.initialize.call(this, options);

    },
    _renderHtml: function() {
        if (!app.api.isAuthenticated() || app.config.appStatus == 'offline') {
            return;
        }
        // loadAdditionalComponents fires render before the private metadata is ready, check for this
        if (app.isSynced) {
            this.createMenuItems = this._getMenuMeta(
                app.metadata.getModuleNames({filter: ['visible', 'quick_create'], access: 'create'})
            );

            app.view.View.prototype._renderHtml.call(this);
        }
    },
})

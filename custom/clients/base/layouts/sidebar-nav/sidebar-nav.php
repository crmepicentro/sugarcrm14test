<?php

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

$viewdefs['base']['layout']['sidebar-nav'] = [
    'components' => [
        [
            'layout' => [
                'type' => 'sidebar-nav-item-group',
                'name' => 'sidebar-nav-item-group-controls',
                'css_class' => 'grow-0 shrink-0',
                'components' => [
                    [
                        'view' => [
                            'name' => 'expand-menu',
                            'type' => 'sidebar-nav-item-expand',
                            'icon' => 'sicon-hamburger-lg',
                            'event' => 'sidebar-nav:expand:toggle',
                            'track' => 'click:sidebar-nav',
                        ],
                    ],
                ],
            ],
        ],
        [
            'layout' => [
                'type' => 'sidebar-nav-item-group',
                'name' => 'sidebar-nav-item-group-top',
                'css_class' => 'grow-0 shrink-0',
                'components' => [
                    [
                        'view' => 'sidebar-nav-item-module',
                        'context' => [
                            'module' => 'Home',
                        ],
                    ],
                ],
            ],
        ],
        [
            'layout' => [
                'type' => 'sidebar-nav-item-group-modules',
                'css_class' => 'flex-grow flex-shrink min-h-[2.5rem]',
            ],
        ],
        [
            'layout' => [
                'type' => 'sidebar-nav-item-group',
                'name' => 'sidebar-nav-item-group-bottom',
                'css_class' => 'grow-0 shrink-0',
                'components' => [
                    [
                        'view' => [
                            'name' => 'acciones-crm',
                            'type' => 'sidebar-nav-item-quickcreate',
                            'icon' => 'sicon-plus-lg',
                            'label' => 'Acciones CRM',
                            'secondary-action' => false,
                            'flyoutComponents' => [
                                [
                                    'view' => 'sidebar-nav-flyout-header',
                                    'title' => 'Acciones CRM',
                                ],
                                [
                                    'view' => 'sidebar-quickcreate',
                                ],
                            ],
                            'track' => 'click:quick-create',
                        ],
                    ],
                ],
            ],
        ],
    ],
];

import { Routes } from '@angular/router';
import { NoAuthGuard } from '../guards/no-auth.guard';

export const CommonLayout_ROUTES: Routes = [

    //Dashboard
    {
        path: 'panel-control',
        canActivate: [ NoAuthGuard ],
        loadChildren: () => import('../../views/dashboard/dashboard.module').then(m => m.DashboardModule),
    },

    
    // Users
    {
        path: 'usuarios',
        canActivate: [ NoAuthGuard ],
        data: {
            title: 'Usuarios'
        },
        loadChildren: () => import('../../views/settings/users/users.module').then(m => m.UsersModule),
    },

    //Roles
    {
        path: 'roles',
        canActivate: [ NoAuthGuard ],
        data: {
            title: 'Roles'
        },
        loadChildren: () => import('../../views/settings/roles/roles.module').then(m => m.RolesModule),
    },

    //Contacts
    {
        path: 'contactos',
        canActivate: [ NoAuthGuard ],
        data: {
            title: 'Contactos'
        },
        loadChildren: () => import('../../views/contacts/contacts.module').then(m => m.ContactsModule),
    },

    //Inventory
    {
        path: 'inventario',
        canActivate: [ NoAuthGuard ],
        data: {
            title: 'Inventario'
        },
        loadChildren: () => import('../../views/inventory/inventory.module').then(m => m.InventoryModule),
    },

    //Accounting
    {
        path: 'contabilidad',
        canActivate: [ NoAuthGuard ],
        data: {
            title: 'Contabilidad'
        },
        loadChildren: () => import('../../views/accounting/accounting.module').then(m => m.AccountingModule),
    },

    //Cierre diario
    {
        path: 'reportes',
        canActivate: [ NoAuthGuard ],
        data: {
            title: 'Reportes'
        },
        loadChildren: () => import('../../views/reports/reports.module').then(m => m.ReportsModule),
    },
];
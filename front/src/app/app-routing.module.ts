import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full-layout/full-layout.component";
import { CommonLayoutComponent } from "./layouts/common-layout/common-layout.component";

import { FullLayout_ROUTES } from "./shared/routes/full-layout.routes";
import { CommonLayout_ROUTES } from "./shared/routes/common-layout.routes";
import { NoAuthGuard } from './shared/guards/no-auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/panel-control',
        pathMatch: 'full',
    },
    {   
        path: '',
        data: {
            title: 'Enlink'
        },
        loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)      
    },
    { 
        path: '', 
        component: CommonLayoutComponent,
        canActivate: [ NoAuthGuard ],
        children: CommonLayout_ROUTES 
    },
    {
        path: '**',
        redirectTo: '/panel-control',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { 
            preloadingStrategy: PreloadAllModules,
            anchorScrolling: 'enabled',
            scrollPositionRestoration: 'enabled' 
        })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {
}
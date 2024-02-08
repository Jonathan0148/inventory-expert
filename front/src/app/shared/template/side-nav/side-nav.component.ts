import { Component } from '@angular/core';
import { ROUTES } from './side-nav-routes.config';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { AuthService } from '../../../views/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-sidenav',
    templateUrl: './side-nav.component.html'
})

export class SideNavComponent{

    public menuItems: any = []
    isFolded : boolean;
    isSideNavDark : boolean;
    isExpand : boolean;
    modules = this.cookieSvc.get('modules') ? JSON.parse(this.cookieSvc.get('modules')) : [] ; 
    
    constructor( 
        private themeService: ThemeConstantService,
        private cookieSvc: CookieService
        ) {}

    ngOnInit(): void {
        this.menuItems = this.getModulesForUser();
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
        this.themeService.isSideNavDarkChanges.subscribe(isDark => this.isSideNavDark = isDark);
    }

    getModulesForUser(){
        let modules = [];
        ROUTES.forEach(menuItem => {
            let mod = menuItem,
            sub = [];
            menuItem.submenu.forEach(module_ => {
                this.modules.map(m => {
                     if(m.name === module_.title) sub.push(module_);
                })
            });
            if(sub.length || menuItem.title == 'Dashboard') {
                mod.submenu = sub;
                modules.push(mod)
            }
        });

        return modules;
    }

    closeMobileMenu(): void {
        if (window.innerWidth < 992) {
            this.isFolded = false;
            this.isExpand = !this.isExpand;
            this.themeService.toggleExpand(this.isExpand);
            this.themeService.toggleFold(this.isFolded);
        }
    }
}

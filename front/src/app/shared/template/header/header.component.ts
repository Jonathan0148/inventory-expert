import { Component } from '@angular/core';
import { AuthService } from 'src/app/views/auth/services/auth.service';
import { ThemeConstantService } from '../../services/theme-constant.service';
import { CrudServices } from '../../services/crud.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent{
    private subscription: Subscription;
    avatarUrl: string = "";
    names: string = "";
    surnames: string = "";
    role: string = "";
    searchVisible : boolean = false;
    quickViewVisible : boolean = false;
    isFolded : boolean;
    isExpand : boolean;
    id:number;
    hasAdminModule: boolean = false;
    modules = this.cookieSvc.get('modules') ? JSON.parse(this.cookieSvc.get('modules')) : []; 

    constructor( 
        private themeService: ThemeConstantService,
        private authSvc:AuthService,
        private _crudSvc:CrudServices,
        private router: Router,
        private cookieSvc: CookieService
    ) {}

    ngOnInit(): void {
        this.listenObserver();
        this.getUser();
        this.setHasAdmin();
        this.themeService.isMenuFoldedChanges.subscribe(isFolded => this.isFolded = isFolded);
        this.themeService.isExpandChanges.subscribe(isExpand => this.isExpand = isExpand);
    }

    toggleFold() {
        this.isFolded = !this.isFolded;
        this.themeService.toggleFold(this.isFolded);
    }

    toggleExpand() {
        this.isFolded = false;
        this.isExpand = !this.isExpand;
        this.themeService.toggleExpand(this.isExpand);
        this.themeService.toggleFold(this.isFolded);
    }

    searchToggle(): void {
        this.searchVisible = !this.searchVisible;
    }

    quickViewToggle(): void {
        this.quickViewVisible = !this.quickViewVisible;
    }

    notificationList = [
        {
            title: 'You received a new message',
            time: '8 min',
            icon: 'mail',
            color: 'ant-avatar-' + 'blue'
        },
        {
            title: 'New user registered',
            time: '7 hours',
            icon: 'user-add',
            color: 'ant-avatar-' + 'cyan'
        },
        {
            title: 'System Alert',
            time: '8 hours',
            icon: 'warning',
            color: 'ant-avatar-' + 'red'
        },
        {
            title: 'You have a new update',
            time: '2 days',
            icon: 'sync',
            color: 'ant-avatar-' + 'gold'
        }
    ];

    public loguot():void {
        this.authSvc.logout();
    }

    //------------------------------------------------------------------------
    //-------------------------------GET DATA---------------------------------
    //------------------------------------------------------------------------

    public getUser(){
        this._crudSvc.getRequest(`/settings/users/getUser`).subscribe((res: any) => {
          const { data } = res;
          this.avatarUrl = data.avatar;
          this.names = data.names;
          this.surnames = data.surnames;
          this.role = data.role;
          this.id = data.id;
        })
    }

    public redirecToUserProfile(){
        this.router.navigate(['/', 'usuarios']);
        setTimeout(() => {
            this.router.navigate(['/', 'usuarios', 'editar', this.id]);
        }, 200);
    }

    private listenObserver = () => {
        this.subscription = this._crudSvc.requestEvent.subscribe((res) => {
          this.getUser();
        });
    }

    private setHasAdmin(){
        const hasAdminModule = this.modules.find((module) => module.code === 21);
        if (hasAdminModule) this.hasAdminModule = true;
      }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public appName: string;
  public appVersion: string;
  public random$: Observable<string>;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private http: HttpClient
  ) {
    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  public async ngOnInit(): Promise<void> {
    this.appName = await this.electronService.ipcRenderer.invoke('app:name');
    this.appVersion = await this.electronService.ipcRenderer.invoke('app:version');
    this.random$ = await this.http.get<string>('test://random');
  }
}

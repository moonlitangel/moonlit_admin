import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Store } from './store';
import { Nick } from './nick';
import { StoreService } from './store.service';

const URL = 'http://52.175.147.246:3005/api/upload';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html'
})
export class StoreDetailComponent implements OnInit {
  model = new Store;
  nick: Nick[];
  getId: number;
  public uploader: FileUploader = new FileUploader({ url: URL });
  private uploadResult: any = null;
  getImg = false;
  imguploader = false;
  menuuploader = false;
  imgurl = 'http://52.175.147.246:3005/api/imgs/';
  imgs: any;
  imgsMenu: string;
  detail: string = '';
  getData = false;
  // hour = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
  // min = ['00', '10', '20', '30', '40', '50'];

  uploadFile() {
    this.uploader.uploadAll(); // 업로드 시작
  }

  storeAddr(addr: any): void {
    this.model.addr = addr.address;
    //console.log(addr, this.model);
  }

  addPush(detail) {
    this.model.addr = this.model.addr + " " + detail;
  }

  imgUpdate() {
    this.StoreService.updateStore(this.model)
      .then(() => {
        this.imguploader = false;
        location.reload();
      });
  }

  update() {
    this.getData = true;
  }

  updatecancel() {
    this.getData = false;
  }

  updateStore(): void {
    this.StoreService.updateStore(this.model)
      .then(() => {
        this.getData = false;
        this.detail = '';
        //console.log("성공");
      }).catch(() => console.log("실패"))
  }

  addimgs() {
    this.imguploader = true;
  }

  addimgsMenu() {
    this.menuuploader = true;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private StoreService: StoreService
  ) {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      this.uploadResult = {
        "success": true, "item": item, "response":
        response, "status": status, "headers": headers
      };
    };
    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.uploadResult = {
        "success": false, "item": item,
        "response": response, "status": status, "headers": headers
      };
    };
    this.uploader.onCompleteAll = () => {
      this.handleUploadComplete();
    };
  }

  getStore(id: number): void {
    this.StoreService.getStore(id)
      .then(results => {
        this.model = results;
        this.imgs = results.storeImages.length;       
      })
  }

  exTime(Store: Store) {
    if ( !Store.openTime && !Store.closeTime && !Store.weekendClose && !Store.weekendOpen ) {
      this.model = Store;
    } else {
        this.model = Store;
        this.model.openTime = Store.openTime.slice(0,5);
        this.model.closeTime = Store.closeTime.slice(0,5);
        this.model.weekendOpen = Store.weekendOpen.slice(0,5);
        this.model.weekendClose = Store.weekendClose.slice(0,5);
    }
  }

  // getNick(): void {
  //   this.StoreService.getUserNick()
  //     .then(results => {
  //       this.nick = results;
  //       for (var i in this.model.store_replies) {
  //         var idx = this.nick.find((nick, idx) => {
  //           return nick.id === this.model.store_replies[i].wdUserId;
  //         });
  //         this.model.store_replies[i].nick = idx.user_nickname;
  //       }
  //     })
  // }

  private handleUploadComplete() {
    //console.log("upload compete : " + this.uploadResult.response);
    // if (this.uploadResult.success) {
    //   //console.log('성공');
    //   this.imgurl = this.imgurl + this.uploadResult.response;
    //   this.getImg = true;
    //   if (this.imguploader) {
    //     this.model.imgs = this.uploadResult.response;
    //     this.imgUpdate('imgs');
    //   }
    //   if (this.menuuploader) {
    //     this.model.imgsMenu = this.uploadResult.response;
    //     this.imgUpdate('imgsMenu');
    //   }
      
    // } else {
    //   //console.log('실패');
    // }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.getId = +params['id']);
    this.getStore(this.getId);
  }
  ngOnChanges() {

  }
}

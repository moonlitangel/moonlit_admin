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
  updateuploader = false;
  imgurl = 'http://52.175.147.246:3005/api/imgs/';
  imgs: any;
  imgsMenu: string;
  detail: string = '';
  getData = false;
  category = ['밥','술','디저트'];
  tagName: string;
  newTag = false;
  updateId: number;
  // hour = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
  // min = ['00', '10', '20', '30', '40', '50'];

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

  uploadFile() {
    this.uploader.uploadAll(); // 업로드 시작
  }

  updateFile(id: number) {
    console.log(id);
    this.updateId = id;
    this.uploadFile();
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

  updateimg() {
    this.updateuploader = true;
  }

  createTag() {
      this.StoreService.createTag(this.model.id, this.tagName)
        .then(() => { 
          this.getStore(this.model.id);
          this.newTag = false;
         });
  }

  deleteImg(id: number, index: number) {
    this.StoreService.deleteImage(id)
      .then(() => {
        this.model.storeImages.splice(index, 1);
      })
  }

  updateTag(id: number, tag: string) {
    this.StoreService.updateTag(id, tag)
      .then(() => {
        this.getStore(this.model.id);
      })
  }

  deleteTag(id: number, index: number) {
    this.StoreService.deleteTag(id)
      .then(() => {
        this.model.tags.splice(index, 1);
      })
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
  
  addTag() {
    this.newTag = true;
  }

  getStore(id: number): void {
    this.StoreService.getStore(id)
      .then(results => {
        this.model = results;
        this.imgs = results.storeImages.length;       
      })
  }

  private handleUploadComplete() {
    console.log("upload compete : " + this.uploadResult.response);
    if (this.uploadResult.success) {
      //console.log('성공');
      this.imgurl = this.imgurl + this.uploadResult.response;
      this.getImg = true;
      if(this.imguploader) {
        this.StoreService.createImage(this.model.id, this.uploadResult.response)
        .then(() => {
          this.getStore(this.model.id);
          this.imguploader = false;
        });
      }
      if(this.updateuploader) {
        this.StoreService.updateImage(this.updateId, this.uploadResult.response)
          .then(() => {
            this.getStore(this.model.id);
            this.updateuploader = false;
            this.updateId = 0;
          });
      }
    } else {
      //console.log('실패');
    }
  }

  confirmDeleteImg(id: number, index: number) :void {
		var r = confirm("삭제하시겠습니까?");
		if(r === true) {
			this.deleteImg(id, index);
			console.log("삭제");
		} else {
			console.log("취소");
		}
	}

  confirmDeleteTag(id: number, index: number) :void {
		var r = confirm("삭제하시겠습니까?");
		if(r === true) {
			this.deleteTag(id, index);
			console.log("삭제");
		} else {
			console.log("취소");
		}
	}

  confirmUpdateTag(id: number, tag: string) {
    var r = confirm("수정하시겠습니까?");
		if(r === true) {
			this.updateTag(id, tag);
			console.log("수정");
		} else {
			console.log("취소");
		}
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.getId = +params['id']);
    this.getStore(this.getId);
  }
  ngOnChanges() {

  }
}

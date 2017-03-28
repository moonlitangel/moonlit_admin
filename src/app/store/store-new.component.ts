import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Store } from './store';
import { StoreService } from './store.service';

const URL = 'http://52.175.147.246:3005/api/upload';

@Component({
  selector: 'app-store-new',
  templateUrl: './store-new.component.html'
})
export class StoreNewComponent implements OnInit {
  model = new Store;
  public uploader: FileUploader = new FileUploader({ url: URL });
	private uploadResult: any = null;
	getImg = false;
	imgurl = 'http://52.175.147.246:3005/imgs/';
  imguploader = false;
  getCategory: string;

  constructor(
    private StoreService: StoreService,
    private router: Router
    ) {
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };	//클라이언트에서의 credentials 문제였던것이였다...
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
      this.uploader.onCompleteItem = () => {
        this.handleUploadComplete();
      }
      this.uploader.onCompleteAll = () => {
      };
    }

  add() {
		this.StoreService.createStore(this.model)
			.then((result) => {
        console.log('스토어생성', result.id);
        if(this.model.images.length > 0) this.uploadImage(result.id, this.model.images);
        if(this.model.tags.length > 0) this.createTag(result.id, this.model.tags);
        //태그등록
			}).then(() => {
        this.router.navigate(['/store/list']);
      })
	}

  changeCategory(category) {
		this.getCategory = category;
	}

  createTag(store: number, tag: Array<any>) {
    for(let t of tag) {
      this.StoreService.createTag(store, t)
        .then(() => {});
    }
  }

  uploadImage(store: number, img: string[]) {
    for(let i of img) {
      this.StoreService.createImage(store, i)
        .then(() => {});
    }
  }

  changeString(model) {
    this.model.tags = model.tags.split(/\s*,\s|,/);
    console.log(model.tags, this.model.tags);
	}

  addimgs() {
    this.imguploader = true;
  }

  uploadFile() {
		this.uploader.uploadAll(); // 업로드 시작
	}

	private handleUploadComplete() {
		console.log("upload compete : ", this.uploadResult);
      if (this.uploadResult.success) {
        console.log('성공');
        // this.imgurl = this.imgurl + this.uploadResult.response;
        this.getImg = true;
        this.model.images.push(this.uploadResult.response);
      } else {
        console.log('실패');
      }
	}

  ngOnInit() {
  }

}

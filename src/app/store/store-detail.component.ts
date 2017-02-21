import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { Store } from './store';
import { StoreService } from './store.service';

const URL = 'http://52.175.147.246:3002/api/upload';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html'
})
export class StoreDetailComponent implements OnInit {
  model = new Store;
  getId: number;
  public uploader: FileUploader = new FileUploader({ url: URL });
	private uploadResult: any = null;
	getImg = false;
  imguploader = false;
	imgurl = 'http://52.175.147.246:3002/api/imgs/';

	uploadFile() {
		this.uploader.uploadAll();
    this.imguploader = false; // 업로드 시작
	}

  addimgs() {
    this.imguploader = true;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private StoreService: StoreService
  ) {
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
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
        console.log(this.model);
      })
  }

  private handleUploadComplete() {
		console.log("upload compete : " + this.uploadResult.response);
		if (this.uploadResult.success) {
			console.log('성공');
			this.imgurl = this.imgurl + this.uploadResult.response;
			this.getImg = true;
			this.model.imgs = this.uploadResult.response;
		} else {
			console.log('실패');
		}
	}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.getId = +params['id']);
    this.getStore(this.getId);
  }
}

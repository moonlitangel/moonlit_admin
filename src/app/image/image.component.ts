import { Component, OnInit } from '@angular/core';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://52.175.147.246:3005/api/upload';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html'
})
export class ImageComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: URL });
  private uploadResult: any = null;
  getImg = false;
  images: string[] = [];
  imgurl = 'http://52.175.147.246:3005/imgs/';
  constructor() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };	//클라이언트에서의 credentials 문제였던것이였다...
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
      this.getImg = true;
    };
  }

  uploadFile() {
		this.uploader.uploadAll(); // 업로드 시작
	}

  private handleUploadComplete() {
    console.log("upload compete : ", this.uploadResult);
    if (this.uploadResult.success) {
      console.log('성공');
      // this.imgurl = this.imgurl + this.uploadResult.response;
      this.images.push(this.uploadResult.response);
    } else {
      console.log('실패');
    }
  }
  ngOnInit() {
  }

}

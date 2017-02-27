import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';

import { Address } from './address';

declare const daum: any;

@Component({
  selector: 'daum-post',
  templateUrl: './daum.component.html'
})
export class DaumComponent implements OnChanges {
  @Output() Address: EventEmitter<any> = new EventEmitter();
  @Input() Addr: string;
  storeAddr: string;
  addr = new Address;

  constructor(private cdr:ChangeDetectorRef) {
  }

  postcode() {
    const comp = this;
    daum.postcode.load(function () {
      new daum.Postcode({
        oncomplete: function (data) {

          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.


          // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
          var extraRoadAddr = ''; // 도로명 조합형 주소 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')';
          }
          // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
          if (fullRoadAddr !== '') {
            fullRoadAddr += extraRoadAddr;
          }


          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          comp.addr = data;

          // document.getElementById('sample4_postcode').value = data.zonecode; //5자리 새우편번호 사용
          // document.getElementById('sample4_roadAddress').value = fullRoadAddr;
          // document.getElementById('sample4_jibunAddress').value = data.jibunAddress;

          // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
          if (data.autoRoadAddress) {
            //예상되는 도로명 주소에 조합형 주소를 추가한다.
            var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
            document.getElementById('guide').innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';

          } else if (data.autoJibunAddress) {
            var expJibunAddr = data.autoJibunAddress;
            document.getElementById('guide').innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';

          } else {
            document.getElementById('guide').innerHTML = '';
          }
        },
        onclose: function (state) {
          //state는 우편번호 찾기 화면이 어떻게 닫혔는지에 대한 상태 변수 이며, 상세 설명은 아래 목록에서 확인하실 수 있습니다.
          if (state === 'FORCE_CLOSE') {
            //사용자가 브라우저 닫기 버튼을 통해 팝업창을 닫았을 경우, 실행될 코드를 작성하는 부분입니다.

          } else if (state === 'COMPLETE_CLOSE') {
            //사용자가 검색결과를 선택하여 팝업창이 닫혔을 경우, 실행될 코드를 작성하는 부분입니다.
            //oncomplete 콜백 함수가 실행 완료된 후에 실행됩니다.
            comp.Address.emit(comp.addr);
            comp.cdr.detectChanges();
          }
        }
      }).open({ autoClose: true });
    });
  }

  ngOnChanges() {
    this.addr.address = this.Addr;
  }
}
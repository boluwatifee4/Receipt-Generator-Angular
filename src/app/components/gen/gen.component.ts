import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import  jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-gen',
  templateUrl: './gen.component.html',
  styleUrls: ['./gen.component.css']
})
export class GenComponent implements OnInit {
 login! : FormGroup;
  result1!: string;
  result2!: number;
  brandName!: string;
  address!: string;
  Customer!: string;
  phoneNum!: number;
  item: any[] = [];
  pricE: any[] = [];
  itemPrice: number[] = [];
  sum!: number;
  showMainContent: Boolean = true;
  showMainContent1: Boolean = true;
  showMainContent2: Boolean = true;
  showMainContent3: Boolean = true;
  currentDate = new Date();
  public convetToPDF() {
        var data = <HTMLCanvasElement> document.getElementById('contentToConvert');
        html2canvas(data).then(canvas => {
            // Few necessary setting options
            var imgWidth = 100;
            var pageHeight = 295;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png')
            let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
            var position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('new-file.pdf'); // Generated PDF
        });
    }
    public snap(){
      let element = <HTMLCanvasElement>  document.querySelector("#contentToConvert");
    html2canvas(element).then(function(canvas) {
        // Convert the canvas to blob
        canvas.toBlob(function(blob){
            // To download directly on browser default 'downloads' location
            let link = document.createElement("a");
            link.download = "image.png";
            link.href = URL.createObjectURL(blob);
            link.click();

            // To save manually somewhere in file explorer
            // window.saveAs(blob, 'image.png');

        },'image/png');
    });
    }
  constructor() { }

  ngOnInit(): void {
     this.login = new FormGroup({
      username: new FormControl(''),
      bN: new FormControl(''),
      addr: new FormControl(''),
      pN: new FormControl(''),
      cus: new FormControl(''),
      password: new FormControl()
    });
  }
  
   getArraySum(a:any){
    var total=0;
    for(var i in a) { 
        total += a[i];
    }
    return total;
}
ShowHideButton() {
      this.showMainContent = this.showMainContent ? false : true;
   }
ShowHideButto() {
      this.showMainContent1 = this.showMainContent1 ? false : true;
   }
ShowHideButt() {
      this.showMainContent2 = this.showMainContent2 ? false : true;
   }
ShowHideBut() {
      this.showMainContent2 = this.showMainContent2 ? false : true;
   }

 sumAll(){
    this.sum = this.getArraySum(this.itemPrice);
  }

   onSubmit() {
    this.brandName = this.login.value.bN;
    this.address = this.login.value.addr;
    this.phoneNum = this.login.value.pN;
    this.Customer = this.login.value.cus;
    this.ShowHideButton()
    this.ShowHideBut()
    this.ShowHideButt()
    this.ShowHideButto()
    this.submitDetails()
    this.sumAll()
    console.log(this.item)
    console.log(this.itemPrice)
  }

  submitDetails(){
     this.result1 = this.login.value.username;
    this.result2 = this.login.value.password;
     this.item.push(this.result1);
    this.itemPrice.push(this.result2);
    this.pricE.push(this.result2)
  }
 
  show(){
  this.ShowHideButto()
  this.ShowHideButt()
  this.submitDetails()
}
  show1(){
  this.ShowHideButto()
  this.ShowHideButt()
}

}


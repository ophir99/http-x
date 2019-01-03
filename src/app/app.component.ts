import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "http-x";
  postForm;
  editForm;
  posts = [];
  msg = "";
  msg_ = "";
  currentPostId;
  url = "http://localhost:8900/posts";
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.createForm();
    this.createEditForm();
    this.http.get(this.url).subscribe(
      (res: any) => {
        console.log(res);
        this.posts = res.posts;
      },
      err => {
        console.log(err);
      }
    );
  }

  createForm() {
    this.postForm = this.formBuilder.group({
      title: [],
      description: []
    });
  }
  createEditForm() {
    this.editForm = this.formBuilder.group({
      title: [],
      description: []
    });
  }

  postData() {
    this.msg = "Creating post.....";
    this.http.post(this.url, this.postForm.value).subscribe(
      res => {
        this.msg = "Post created Successfully";
      },
      err => console.log(err)
    );
  }
  editData() {
    this.msg_ = "editing post.....";

    // http://localhost:8900/posts/673263726372
    this.http
      .put(`${this.url}/${this.currentPostId}`, this.editForm.value)
      .subscribe(
        res => {
          this.msg_ = "Post edit Successfully";
        },
        err => console.log(err)
      );
  }

  setPost(post) {
    this.currentPostId = post._id;
    console.log(post);
    this.editForm.patchValue(post);
  }

  deletePost(id) {
    const obs = this.http.delete(`${this.url}/${id}`);

    obs.subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}

import { Component, input } from "@angular/core";
import { TagType } from "../../models/todo.model";

@Component({
    selector: 'todo-detail',
    templateUrl: './todo-detail.html',
    styleUrl: './todo-detail.css'
})
export class TodoDetail {
    title = input.required<string>()
    tag = input.required<TagType>()
    description = input.required<string>()
}
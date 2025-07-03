import { Component, computed, input, output, signal } from '@angular/core';
import { TagType } from '../models/todo.model';

@Component({
  selector: 'tabs',
  imports: [],
  templateUrl: './tabs.html',
  styleUrl: './tabs.css'
})
export class Tabs {
  activeTabInput = input.required<TagType>()
  setActiveTab = output<TagType>()
}

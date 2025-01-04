import { ChangeDetectionStrategy, Component } from '@angular/core';
import { profileIconNames } from './profile-icon-names';

@Component({
  selector: 'con-profile-icon-selector',
  templateUrl: './profile-icon-selector.component.html',
  styleUrls: ['./profile-icon-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileIconSelectorComponent {
  public readonly profileIcons = profileIconNames;
  public showAllIcons = true;
  public selectedIcon: string | null = '';

  public onSelectIcon(icon: string): void {
    console.log('icon', icon);
    this.showAllIcons = false;
    this.selectedIcon = icon;
  }
}

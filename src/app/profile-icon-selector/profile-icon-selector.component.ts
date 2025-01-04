import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Provider,
  signal,
} from '@angular/core';
import { profileIconNames } from './profile-icon-names';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const PROFILE_ICON_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProfileIconSelectorComponent),
  multi: true,
};

@Component({
  selector: 'con-profile-icon-selector',
  templateUrl: './profile-icon-selector.component.html',
  styleUrls: ['./profile-icon-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PROFILE_ICON_VALUE_ACCESSOR],
})
export class ProfileIconSelectorComponent implements ControlValueAccessor {
  public readonly profileIcons = profileIconNames;
  public showAllIcons = signal(true);
  public selectedIcon: string | null = '';

  private onChange!: Function;
  private onTouched!: Function;

  public onSelectIcon(icon: string): void {
    this.showAllIcons.set(false);
    this.selectedIcon = icon;
    this.onChange(icon);
  }

  public showIcons(): void {
    this.showAllIcons.set(true);
  }

  writeValue(icon: string): void {
    console.log('writeValue icon', icon);
    this.selectedIcon = icon;
    this.showAllIcons.set(icon && icon !== '' ? false : true);
  }

  registerOnChange(fn: Function): void {
    this.onChange = (icon: string) => {
      fn(icon);
    };
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
}

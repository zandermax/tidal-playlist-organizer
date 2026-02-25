import alertCircleIcon from './AlertCircleIcon.svg?raw';
import arrowDownIcon from './ArrowDownIcon.svg?raw';
import arrowUpIcon from './ArrowUpIcon.svg?raw';
import calendarIcon from './CalendarIcon.svg?raw';
import checkboxCheckIcon from './CheckboxCheckIcon.svg?raw';
import chevronDownIcon from './ChevronDownIcon.svg?raw';
import chevronRightIcon from './ChevronRightIcon.svg?raw';
import clockIcon from './ClockIcon.svg?raw';
import closeIcon from './CloseIcon.svg?raw';
import editIcon from './EditIcon.svg?raw';
import exportIcon from './ExportIcon.svg?raw';
import filterIcon from './FilterIcon.svg?raw';
import folderIcon from './FolderIcon.svg?raw';
import gridIcon from './GridIcon.svg?raw';
import infoIcon from './InfoIcon.svg?raw';
import libraryIcon from './LibraryIcon.svg?raw';
import listIcon from './ListIcon.svg?raw';
import logoutIcon from './LogoutIcon.svg?raw';
import musicNoteIcon from './MusicNoteIcon.svg?raw';
import plusIcon from './PlusIcon.svg?raw';
import searchIcon from './SearchIcon.svg?raw';
import settingsIcon from './SettingsIcon.svg?raw';
import shareIcon from './ShareIcon.svg?raw';
import tagIcon from './TagIcon.svg?raw';
import trashIcon from './TrashIcon.svg?raw';

export const icons = {
	'alert-circle': alertCircleIcon,
	'arrow-down': arrowDownIcon,
	'arrow-up': arrowUpIcon,
	calendar: calendarIcon,
	'checkbox-check': checkboxCheckIcon,
	'chevron-down': chevronDownIcon,
	'chevron-right': chevronRightIcon,
	clock: clockIcon,
	close: closeIcon,
	edit: editIcon,
	export: exportIcon,
	filter: filterIcon,
	folder: folderIcon,
	grid: gridIcon,
	info: infoIcon,
	library: libraryIcon,
	list: listIcon,
	logout: logoutIcon,
	'music-note': musicNoteIcon,
	plus: plusIcon,
	search: searchIcon,
	settings: settingsIcon,
	share: shareIcon,
	tag: tagIcon,
	trash: trashIcon
} as const;

export type IconName = keyof typeof icons;

import { AlbumCell } from "./cells/AlbumCell";
import { AvatarCell } from "./cells/AvatarCell";
import { DurationCell } from "./cells/DurationCell";
import { LikedCell } from "./cells/LikedCell";
import { NameCell } from "./cells/NameCell";
import { OrderCell } from "./cells/OrderCell";
import { DurationHeader } from "./column-headers/DurationHeader";
import { TextHeader } from "./column-headers/TextHeader";

type ColumnType = 'order' | 'avatar' | 'name' | 'album' | 'liked' | 'duration'

export const columnsDefinitions: { key: ColumnType, label: string }[] = [
	{
		key: "order",
		label: "#",
	},
	{
		key: "avatar",
		label: "Title",
	},
	{
		key: "name",
		label: "",
	},
	{
		key: "album",
		label: "Album",
	},
	{
		key: "liked",
		label: "",
	},
	{
		key: "duration",
		label: "DURATION",
	},
];

export const headersMap: Record<ColumnType, React.FC<{
	column: {
		key: ColumnType;
		label: string;
	}
}>> = {
	'order': TextHeader,
	'avatar': TextHeader,
	'name': TextHeader,
	'album': TextHeader,
	'liked': TextHeader,
	'duration': DurationHeader
}

export const cellsMap: Record<ColumnType, React.FC> = {
	'order': OrderCell,
	'avatar': AvatarCell,
	'name': NameCell,
	'album': AlbumCell,
	'liked': LikedCell,
	'duration': DurationCell
}
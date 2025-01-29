import { AlbumCell } from "./cells/AlbumCell";
import { AvatarCell } from "./cells/AvatarCell";
import { DurationCell } from "./cells/DurationCell";
import { LikedCell } from "./cells/LikedCell";
import { NameCell } from "./cells/NameCell";
import { PlayCell } from "./cells/PlayCell";
import { DurationHeader } from "./column-headers/DurationHeader";
import { TextHeader } from "./column-headers/TextHeader";
import { CellProps, ColumnType, PlaylistColumnType } from "./types";


export const allColumnsDefinitions: { key: ColumnType | PlaylistColumnType, label: string }[] = [
	{
		key: "play",
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
	{
		key: 'added-at',
		label: 'Added at',
	},
	{
		key: 'added-by',
		label: 'Added by'
	}
];

export const headersMap: Record<ColumnType | PlaylistColumnType, React.FC<{
	column: {
		key: ColumnType | PlaylistColumnType;
		label: string;
	}
}>> = {
	'play': TextHeader,
	'avatar': TextHeader,
	'name': TextHeader,
	'album': TextHeader,
	'liked': TextHeader,
	'duration': DurationHeader,
	"added-at": TextHeader,
	"added-by": TextHeader
}

export const cellsMap: Record<ColumnType | PlaylistColumnType, React.FC<CellProps>> = {
	'play': PlayCell,
	'avatar': AvatarCell,
	'name': NameCell,
	'album': AlbumCell,
	'liked': LikedCell,
	'duration': DurationCell,
	'added-at': NameCell,
	'added-by': NameCell,
}

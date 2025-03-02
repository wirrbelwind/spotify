interface GetBestFitImageArgs {
	images: {
		url: string
		width?: number | null
		height?: number | null
	}[]

	preferredSize: {
		width: number
		height: number
	}
}

interface GetBestFitImageReturn {
	width: number
	height: number
	url: string
	fit: 'exact' | 'similar'
	difference: {
		width: number
		height: number
		total: number
	}
}

export const getBestFitImage = ({ images, preferredSize }: GetBestFitImageArgs) => {
	if (!images || !images.length) {
		return null
	}

	const firstImage = images[0]
	const firstImageWidthDifference = Math.abs(firstImage.width - preferredSize.width)
	const firstImageHeightDifference = Math.abs(firstImage.height - preferredSize.height)

	const firstImageAsResult: GetBestFitImageReturn = {
		url: firstImage.url,
		width: firstImage.width,
		height: firstImage.height,
		fit: (
			firstImage.width === preferredSize.width
			&&
			firstImage.height === preferredSize.height
		) ? 'exact' : 'similar',
		difference: {
			width: firstImageWidthDifference,
			height: firstImageHeightDifference,
			total: firstImageWidthDifference + firstImageHeightDifference
		}
	}

	if (images.length === 1) {
		return firstImageAsResult
	}

	const bestFitImage = images.reduce<GetBestFitImageReturn>(((acc, image, index) => {
		if (index === 0) {
			return acc
		}

		const currentImageWidthDifference = Math.abs(image.width - acc.width)
		const currentImageHeightDifference = Math.abs(image.height - acc.height)
		const currentImageTotalDifference = currentImageWidthDifference + currentImageHeightDifference

		const newAcc: GetBestFitImageReturn = {
			url: image.url,
			height: image.height,
			width: image.width,
			difference: {
				width: currentImageWidthDifference,
				height: currentImageHeightDifference,
				total: currentImageTotalDifference
			},
			fit: 'similar'
		}

		const isExactSameSize = currentImageTotalDifference === 0

		if (isExactSameSize) {
			newAcc.fit = 'exact'

			return newAcc
		}

		if (currentImageTotalDifference < acc.difference.total) {
			return newAcc
		}

		return acc
	}), firstImageAsResult)

	return bestFitImage
}

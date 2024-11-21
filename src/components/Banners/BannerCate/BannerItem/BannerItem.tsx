import { Stack, Typography, useMediaQuery } from "@mui/material"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"

interface BannerItemProps {
	title?: string
	icon?: React.ReactNode
}

const BannerItem = ({
	title = "Phone",
	icon = <AddAPhotoIcon sx={{ height: "40px", width: "40px" }} />,
}: BannerItemProps) => {
	const isAbove900Screen = useMediaQuery('(min-width:900px)');

	return (
		<Stack
			direction="row"
			spacing={3}
			justifyContent="center"
			alignItems="center"
			color="#fff"
		>
			{icon}
			<Typography
				sx={{
					width: "auto",
					marginLeft: isAbove900Screen ? "20px" : '10px !important',
					textTransform: "uppercase",
					fontWeight: 500,
					textWrap: 'pretty',
					textAlign: "left",
				}}
				variant="h2"
				fontSize="12px"
			>
				{title}
			</Typography>
		</Stack>
	)
}

export default BannerItem

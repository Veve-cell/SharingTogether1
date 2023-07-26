/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types'
import { memo } from 'react'
// @mui
import { Box } from '@mui/material'
//
import { StyledRootScrollbar, StyledScrollbar } from './styles'

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
}

function Scrollbar({ children, sx, ...other }) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)

  if (isMobile) {
    return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    )
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope, react/jsx-no-comment-textnodes
    <StyledRootScrollbar>
      {/* eslint-disable-next-line react/react-in-jsx-scope, react/react-in-jsx-scope, react/react-in-jsx-scope */}
      <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  )
}

export default memo(Scrollbar)

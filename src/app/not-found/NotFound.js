import React from 'react';
import { Link } from '@reach/router';
// UI Components
import PageTitle from '../../common/ui/PageTitle';
// MUI Components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/core/styles';
import { compose, fontWeight } from '@material-ui/system';

const Typo = styled(Typography)(compose(fontWeight));

export default function NotFound() {
  return (
    <>
      <PageTitle renderTitle="404" backButton />
      <Box display="flex" justifyContent="center" mt={2}>
        <Typo component="h1" fontWeight="700">
          Unfortunately, this site does not exist yet.
        </Typo>
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Typography>
          Why not <Link to="/discover">searching</Link> for something else?
        </Typography>
      </Box>
    </>
  );
}

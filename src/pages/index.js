import React from 'react'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import { graphql, StaticQuery } from 'gatsby'
import Drawer from '@material-ui/core/Drawer'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'

import { makeStyles, useTheme } from '@material-ui/core/styles'

const drawerWidth = 400

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

export default function SideNav(data) {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)

  function handleDrawer() {
    open ? setOpen(false) : setOpen(true)
  }

  return (
    <StaticQuery
      query={titleQuery}
      render={data => (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <div variant="h6" noWrap>
                GP Pain Help
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <div>
              {data.allMarkdownRemark.edges.map(({ node }) => {
                return (
                  <ListItem
                    button
                    key={node.frontmatter.title}
                    className={classes.listitem}
                  >
                    <ListItemIcon>
                      {/* <InboxIcon /> TODO: Dynamically update */}
                    </ListItemIcon>
                    <ListItemText
                      primary={node.frontmatter.title}
                      className={classes.listitemtext}
                    />
                  </ListItem>
                )
              })}
            </div>
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <div paragraph>
              {' '}
              <span>
                Welcome to the GP Pain Help App, to help GPs manage cancer pain
                in their patients.
              </span>
              <div>
                {data.allMarkdownRemark.edges.map(({ node }) => {
                  return (
                    <Button
                      variant="contained"
                      color="primary"
                      key={node.frontmatter.title}
                    >
                      {node.frontmatter.title}
                    </Button>
                  )
                })}
              </div>
            </div>
          </main>
        </div>
      )}
    />
  )
}

export const titleQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { frontmatter: { title: { ne: null } } }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
`

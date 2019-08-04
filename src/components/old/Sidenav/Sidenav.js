import React from 'react'
import clsx from 'clsx'
import { graphql, StaticQuery } from 'gatsby'
import Drawer from '@material-ui/core/Drawer'

import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'

import style from './Sidenav.module.css'
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
    backgroundColor: 'white',
    color: '#099CF2',
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
  listitem: {
    padding: '22px 0',
  },
  listitemtext: {
    fontWeight: 'bold',
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
    backgroundColor: 'grey',
    height: '150px',
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
        <>
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
                className={clsx(classes.menuButton)}
              >
                {open ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
              GP Pain Help
            </Toolbar>
          </AppBar>

          <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>Image here</div>
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
        </>
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

export const COLUMNS_REPOS = [
  
    {
      Header: "Repository",
      Footer: "Repository",
      accessor: "name",
      sticky: "left"
    },
    {
      Header: "Language",
      Footer: "Language",
      accessor: "language",
      sticky: "left"
    },
    {
      Header: "URL",
      Footer: "URL",
      accessor: "html_url",
      Cell: ({ row }) => <a href={row.original.html_url} target="_blank" >{row.original.html_url}</a>,
      sticky: "left"
    }
  ];
  
export const COLUMNS_ACTIVITIES = [{
    Header: "Event Type",
    Footer: "Event Type",
    accessor: "type",
    sticky: "left"
  },
  {
    Header: "Actor",
    Footer: "Actor",
    accessor: "actor.login",
    sticky: "left"
  },
  {
    Header: "Repository",
    Footer: "Repository",
    accessor: "repo.name",
    sticky: "left"
  }
  ]
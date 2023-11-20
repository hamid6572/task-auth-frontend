import DraftsItem from './DraftsItem'

const DraftList = props => {
  return (
    <div>
      {props.drafts.map(item => (
        <DraftsItem
          key={item.id}
          draft={item}
          deleteHandeler={props.deleteHandeler}
          publishDraftHandeler={props.publishDraftHandeler}
        />
      ))}
    </div>
  )
}

export default DraftList

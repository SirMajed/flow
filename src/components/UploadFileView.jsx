import Button from './Button'
import InputFile from './InputFile'
import { MdFileDownload, MdClear } from 'react-icons/md'

const UploadFileView = ({
  inputRefOne,
  handleFileOne,
  inputRefTwo,
  handleFileTwo,
  nodeType,
  handleNodeFilter,
  handleEdgeFilter,
  domNode,
  nodes,
  edges,
  edgesType,
  downloadNetworkAsImage,
  handleClear,
}) => {
  return (
    <div className="flex bg-gray-100 flex-col items-center justify-around h-screen" id="main">
      <div className="flex-col">
        <div className="flex items-center gap-2">
          <div>
            <InputFile label="1. Upload stakeholders file" re={inputRefOne} onChange={handleFileOne} />
          </div>

          <div>
            <InputFile label="2. Upload edge matrix file" re={inputRefTwo} onChange={handleFileTwo} />
          </div>
        </div>
      </div>
      {/*  */}

      <div className="flex flex-col items-center h-full w-full mt-4">
        <div className="w-11/12 h-5/6 my-t-4 mb-1 relative border-2 border-dashed">
          <select id="nodeType" className="absolute top-0 right-0 z-10 bg-primary gap-2 px-2 py-1.5 my-1 mx-2 text-white" onChange={handleNodeFilter}>
            <option selected value="none">
              Stakeholders filter
            </option>
            {nodeType.map((t) => (
              <option value={t}>{t}</option>
            ))}
          </select>

          <select id="relationType" className="absolute top-0 right-20 z-10 bg-primary gap-2 px-5 py-1.5 my-1 mr-28 text-white" onChange={handleEdgeFilter}>
            <option selected value="none">
              Relation filter
            </option>
            {edgesType.map((t) => (
              <option value={t}>{t}</option>
            ))}
          </select>
          <div id="test" className="w-full h-full my-t-4 mb-1" ref={domNode} />
        </div>

        <div id="fff" className="flex items-center gap-2">
          {((nodes && nodes.length >= 1) || (edges && edges.length >= 1)) && <Button icon={<MdClear color="white" size={20} />} text="Reset" onClick={handleClear} />}

          <Button icon={<MdFileDownload color="white" size={20} />} text="Export" onClick={downloadNetworkAsImage} />
        </div>
      </div>
    </div>
  )
}
export default UploadFileView

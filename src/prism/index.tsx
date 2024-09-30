import Prism from 'prismjs';
import './prism-tlb.js';
import './prism.css';

export interface PrismCodeTLB {
  children: string;
}

export function PrismCodeTLB(props: PrismCodeTLB) {

  const html = Prism.highlight(props.children, Prism.languages.tlb, 'tlb');

  return (
    <div className="prism-pre">
      <code className="prism-code language-tlb" dangerouslySetInnerHTML={{__html: html}} />
    </div>
  )
}

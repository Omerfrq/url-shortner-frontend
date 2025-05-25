interface MetaTags {
  title?: string;
  description?: string;
  favicon?: string;
  ogImage?: string;
}

export const MetaTagPreview: React.FC<{ metaTags?: MetaTags }> = ({
  metaTags,
}) => {
  if (!metaTags) {
    return (
      <div className='text-center'>
        <h3 className='mt-2 text-sm font-semibold text-gray-900'>
          No Preview Available!
        </h3>
      </div>
    );
  }

  return (
    <div className='max-w-xl mx-auto border rounded-2xl overflow-hidden shadow-lg bg-white'>
      <div className='relative h-48 w-full bg-gray-200'>
        <img
          src={metaTags.ogImage}
          alt='Open Graph'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='p-4'>
        <div className='flex items-center space-x-2 mb-2'>
          <img src={metaTags.favicon} alt='favicon' className='w-5 h-5' />
          <span className='text-xs text-gray-500'>omerfarooq.net</span>
        </div>

        <h2 className='text-lg font-semibold text-gray-900'>
          {metaTags.title}
        </h2>

        <p className='text-sm text-gray-600 mt-1'>{metaTags.description}</p>
      </div>
    </div>
  );
};
